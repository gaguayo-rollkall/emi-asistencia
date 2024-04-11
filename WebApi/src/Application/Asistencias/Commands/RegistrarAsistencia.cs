using Microsoft.Extensions.DependencyInjection.Asistencias.Queries;
using Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;
using Microsoft.Extensions.DependencyInjection.Eventos.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Asistencias.Commands;

public class RegistrarAsistenciaCommand : IRequest<RegistroAsistenciaDto?>
{
    public string? RFID { get; set; }
    public string? CodigoEstudiante { get; set; }
    public int? EventoId { get; set; }
}

public class RegistrarAsistenciaCommandHandler : IRequestHandler<RegistrarAsistenciaCommand, RegistroAsistenciaDto?>
{
    private readonly IApplicationDbContext _context;

    public RegistrarAsistenciaCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<RegistroAsistenciaDto?> Handle(RegistrarAsistenciaCommand request, CancellationToken cancellationToken)
    {
        var estudiante = await _context.Estudiantes
            .AsNoTracking()
            .Select(e => new EstudianteDto
            {
                Codigo = e.Codigo,
                Nombre = e.Nombre,
                RFID = e.RFID,
                Email = e.Email,
                Foto = e.Foto,
                Grado = e.Grado,
            })
            .FirstOrDefaultAsync(e => e.Codigo == request.CodigoEstudiante ||
                                      e.RFID == request.RFID);

        if (estudiante is null)
        {
            return null;
        }
        
        var asistenciasDeHoy = await _context.Asistencias
            .AsNoTracking()
            .Where(a => a.CodigoEstudiante == request.CodigoEstudiante &&
                        a.Fecha.Date == DateTime.Now.Date)
            .CountAsync(cancellationToken);
        
        var entity = new Asistencia
        {
            Fecha = DateTime.UtcNow,
            RFID = !string.IsNullOrEmpty(request.RFID) ? request.RFID : string.Empty,
            CodigoEstudiante = request.CodigoEstudiante,
            Evento = request.EventoId,
        };

        _context.Asistencias.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        if (request.EventoId is not null && request.EventoId > 0)
        {
            var evento = await _context.EventosCalendario
                .AsNoTracking()
                .Select(e => new RegistroAsistenciaDto
                {
                    Id = e.Id,
                    Subject = e.Subject,
                })
                .FirstOrDefaultAsync(e => e.Id == request.EventoId, cancellationToken);

            return evento;
        }

        return new RegistroAsistenciaDto
        {
            Codigo = estudiante.Codigo,
            RFID = estudiante.RFID,
            Grado = estudiante.Grado,
            Nombre = estudiante.Nombre,
            Foto = estudiante.Foto,
            Warning = asistenciasDeHoy > 2,
        };
    }
}
