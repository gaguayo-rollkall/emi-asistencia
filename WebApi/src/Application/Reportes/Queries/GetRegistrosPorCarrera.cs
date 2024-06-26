﻿using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Reportes.Queries;

[Authorize]
public record GetRegistrosPorCarreraQuery(
    Guid? carreraId,
    Guid periodoAcademicoId,
    Guid cursoId,
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
            .Select(c => new { c.Id, Nombre = c.Nombre.ToUpper(), })
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
        
        var fechaInicio = new DateTime(request.fechaInicio.Year, request.fechaInicio.Month, request.fechaInicio.Day, 0, 0, 0).ToUniversalTime();
        var fechaFin = new DateTime(request.fechaFin.Year, request.fechaFin.Month, request.fechaFin.Day, 23, 59, 59).ToUniversalTime();

        var cursos = await _context.Cursos
            .AsNoTracking()
            .Where(c => c.PeriodoAcademicoId == periodoAcademico.Id)
            .Where(c => request.cursoId == Guid.Empty || request.cursoId == c.Id)
            .Select(c => new
            {
                c.CarreraId,
                c.Id,
                Nombre = c.Nombre.ToUpper(),
                Estudiantes = c.CursoEstudiantes
                    .Select(ce => ce.Estudiante)
                    .ToList(),
            })
            .GroupBy(c => c.CarreraId)
            .ToDictionaryAsync(c => c.Key, c => c.Select(x => x), cancellationToken);

        var asistencias = await _context.Asistencias
            .AsNoTracking()
            .Where(a => a.Fecha >= fechaInicio && a.Fecha <= fechaFin)
            .Where(a => a.Evento == null)
            .ToListAsync(cancellationToken);
            
        var licencias = await _context.Licencias
            .AsNoTracking()
            .Where(l => l.FechaInicio >= fechaInicio.Date && l.FechaFin <= fechaFin.Date)
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
                        .OrderBy(a => a.Fecha)
                        .ToList();
                    var licencia = licencias.FirstOrDefault(l => l.CodigoEstudiante == estudiante.Codigo);

                    registroEstudiante.Fecha = request.fechaInicio.ToString("dd/MM/yyyy");
                    registroEstudiante.Licencia = licencia?.Estatus ?? string.Empty;
                    
                    if (asistenciasPorEstudiante.Any())
                    {
                        registroEstudiante.Ingreso = asistenciasPorEstudiante.First().Fecha.ToLocalTime().ToString("HH:mm:ss");
                        registroEstudiante.Salida = asistenciasPorEstudiante.Count >= 2 ? asistenciasPorEstudiante.Last().Fecha.ToLocalTime().ToString("HH:mm:ss") : string.Empty;
                        registroEstudiante.Registros = asistenciasPorEstudiante.Count;
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
