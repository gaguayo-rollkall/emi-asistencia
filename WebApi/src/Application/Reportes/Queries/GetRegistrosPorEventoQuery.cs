using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Reportes.Queries;

[Authorize]
public record GetRegistrosPorEventoQuery(Guid? carreraId, Guid periodoAcademicoId, Guid cursoId, int evento) : IRequest<IList<RegistroCarreraDto>>;

public class GetRegistrosPorEventoQueryHandler : IRequestHandler<GetRegistrosPorEventoQuery, IList<RegistroCarreraDto>>
{
    private readonly IApplicationDbContext _context;

    public GetRegistrosPorEventoQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<RegistroCarreraDto>> Handle(GetRegistrosPorEventoQuery request, CancellationToken cancellationToken)
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

        var evento = await _context.EventosCalendario
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Id == request.evento, cancellationToken);

        if (evento is null)
        {
            return registros;
        }

        var cursos = await _context.Cursos
            .AsNoTracking()
            .Where(c => c.PeriodoAcademicoId == periodoAcademico.Id)
            .Where(c => request.cursoId == Guid.Empty || request.cursoId == c.Id)
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
            .Where(a => a.Evento == request.evento)
            .ToListAsync(cancellationToken);
        
        var licencias = await _context.Licencias
            .AsNoTracking()
            .Where(l => l.Fecha == evento.StartTime!.Value.Date)
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
                        .Where(a => a.CodigoEstudiante == estudiante.Codigo)
                        .OrderBy(a => a.Fecha)
                        .ToList();

                    var licencia = licencias.FirstOrDefault(l => l.CodigoEstudiante == estudiante.Codigo);
                    registroEstudiante.Licencia = licencia?.Estatus ?? string.Empty;
                    
                    if (asistenciasPorEstudiante.Any())
                    {
                        var fecha = asistenciasPorEstudiante.First().Fecha.ToLocalTime();
                        var minutos = evento.EndTime!.Value.Subtract(asistenciasPorEstudiante.First().Fecha).TotalMinutes;

                        registroEstudiante.Fecha = fecha.ToString("dd/MM/yyyy");
                        registroEstudiante.Ingreso = fecha.ToString("HH:mm:ss");
                        registroEstudiante.Salida = asistenciasPorEstudiante.Count >= 2 ? asistenciasPorEstudiante.Last().Fecha.ToLocalTime().ToString("HH:mm:ss") : string.Empty;
                        registroEstudiante.Registros = asistenciasPorEstudiante.Count;
                        registroEstudiante.Observacion = minutos < 10 ? "Registro muy tarde" : string.Empty;
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
