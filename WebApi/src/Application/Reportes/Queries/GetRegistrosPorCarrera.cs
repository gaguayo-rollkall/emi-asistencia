using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Reportes.Queries;

[Authorize]
public record GetRegistrosPorCarreraQuery(
    Guid? carreraId,
    Guid periodoAcademicoId,
    DateTime fechaInicio,
    DateTime fechaFin) : IRequest<IList<RegistroCarreraDto>>;

public class
    GetRegistrosPorCarreraQueryHandler : IRequestHandler<GetRegistrosPorCarreraQuery, IList<RegistroCarreraDto>>
{
    private readonly IApplicationDbContext _context;

    public GetRegistrosPorCarreraQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<RegistroCarreraDto>> Handle(GetRegistrosPorCarreraQuery request, CancellationToken cancellationToken)
    {
        var registros = new List<RegistroCarreraDto>();
        
        var carreras = await _context.Carreras
            .AsNoTracking()
            .Where(c => request.carreraId == null || c.Id == request.carreraId)
            .Select(c => new { c.Id, c.Nombre, })
            .OrderBy(c => c.Nombre)
            .ToListAsync(cancellationToken);

        var periodoAcademico = await _context.PeriodoAcademicos
            .AsNoTracking()
            .Where(p => p.Id == request.periodoAcademicoId)
            .Select(s => new
            {
                s.Id,
            })
            .FirstOrDefaultAsync(cancellationToken);

        if (periodoAcademico is null)
        {
            return registros;
        }

        var dias = new List<DateOnly>();
        var fechaInicio = DateOnly.FromDateTime(request.fechaInicio);
        var fechaFin = DateOnly.FromDateTime(request.fechaFin);

        while (fechaInicio <= fechaFin)
        {
            dias.Add(new DateOnly(fechaInicio.Year, fechaFin.Month, fechaInicio.Day));
            fechaInicio = fechaInicio.AddDays(1);
        }

        var cursos = await _context.Cursos
            .AsNoTracking()
            .Where(c => c.PeriodoAcademicoId == periodoAcademico.Id)
            .Select(c => new
            {
                c.CarreraId,
                c.Id,
                c.Nombre,
                Estudiantes = c.CursoEstudiantes
                    .Select(ce => ce.Estudiante)
                    .ToList(),
            })
            .GroupBy(c => c.CarreraId)
            .ToDictionaryAsync(c => c.Key, c => c.Select(x => x), cancellationToken);

        var asistencias = await _context.Asistencias
            .AsNoTracking()
            .Where(a => a.Fecha >= request.fechaInicio && a.Fecha <= request.fechaFin)
            .Where(a => a.Evento == null)
            .ToListAsync(cancellationToken);
            
        foreach (var carrera in carreras)
        {
            var registro = new RegistroCarreraDto { IdCarrera = carrera.Id, Carrera = carrera.Nombre, };

            if (!cursos.TryGetValue(carrera.Id, out var cursosPorCarrera))
            {
                continue;
            }

            foreach (var curso in cursosPorCarrera)
            {
                var registroCurso = new RegistroCurso { Id = curso.Id, Nombre = curso.Nombre, };

                foreach (var estudiante in curso.Estudiantes)
                {
                    var registroEstudiante = new RegistroEstudiante { Codigo = estudiante!.Codigo, Nombre = estudiante.Nombre };
                    var asistenciasPorEstudiante = asistencias
                        .Where(a => a.CodigoEstudiante == estudiante.Codigo || a.RFID == estudiante.RFID)
                        .Select(a => new
                        {
                            Fecha = new DateOnly(a.Fecha.Year, a.Fecha.Month, a.Fecha.Day),
                        });

                    foreach (var dia in dias)
                    {
                        registroEstudiante.Asistencias.Add(new RegistroAsistencia
                        {
                            Dia = dia.ToString("d"),
                            Asistencia = asistenciasPorEstudiante.Any(a => a.Fecha == dia),
                        }); 
                    }

                    registroCurso.Estudiantes.Add(registroEstudiante);
                }
                
                registro.Cursos.Add(registroCurso);
            }
            
            registros.Add(registro);
        }

        return registros;
    }
}
