using Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;
using Microsoft.Extensions.DependencyInjection.Eventos.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Asistencias.Commands;

public class RegistrarAsistenciaCommand : IRequest<EventoDto?>
{
    public string? RFID { get; set; }
    public string? CodigoEstudiante { get; set; }
    public int? EventoId { get; set; }
}

public class RegistrarAsistenciaCommandHandler : IRequestHandler<RegistrarAsistenciaCommand, EventoDto?>
{
    private readonly IApplicationDbContext _context;

    public RegistrarAsistenciaCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<EventoDto?> Handle(RegistrarAsistenciaCommand request, CancellationToken cancellationToken)
    {
        var estudiante = await _context.Estudiantes
            .AsNoTracking()
            .Select(e => new EstudianteDto
            {
                Codigo = e.Codigo,
                Nombre = e.Nombre,
                RFID = e.RFID,
                Email = e.Email,
            })
            .FirstOrDefaultAsync(e => e.Codigo == request.CodigoEstudiante ||
                                      e.RFID == request.RFID);

        if (estudiante is null)
        {
            return null;
        }
        
        var entity = new Asistencia
        {
            Fecha = DateTime.Now,
            RFID = !string.IsNullOrEmpty(request.RFID) ? request.RFID : string.Empty,
            CodigoEstudiante = request.CodigoEstudiante,
            Evento = request.EventoId,
        };
        
        var evento = await _context.EventosCalendario
            .AsNoTracking()
            .Select(e => new EventoDto
            {
                Id = e.Id,
                Description = e.Description,
                StartTime = e.StartTime,
                EndTime = e.EndTime,
                IsAllDay = e.IsAllDay,
                Subject = e.Subject,
                Location = e.Location,
                RecurrenceRule = e.RecurrenceRule,
            })
            .FirstOrDefaultAsync(e => e.Id == request.EventoId, cancellationToken);

        _context.Asistencias.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return evento;
    }
}
