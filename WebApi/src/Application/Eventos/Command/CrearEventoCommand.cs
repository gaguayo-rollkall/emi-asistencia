using Microsoft.Extensions.DependencyInjection.Eventos.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Eventos.Command;

public class CrearEventoCommand : IRequest<int>
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public string? StartTime { get; set; }
    public string? EndTime { get; set; }
    public bool IsAllDay { get; set; }
    public string Subject { get; set; } = default!;
    public string? Location { get; set; }
    public string? RecurrenceRule { get; set; }
}


public class CrearEventoCommandHandler : IRequestHandler<CrearEventoCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CrearEventoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CrearEventoCommand request, CancellationToken cancellationToken)
    {
        var eventoDb = await _context.EventosCalendario
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (eventoDb is null)
        {
            eventoDb = new EventoCalendario
            {
                Id = request.Id,
            };

            _context.EventosCalendario.Add(eventoDb);
        }
        
        eventoDb.Description = request.Description;
        eventoDb.Location = request.Location;
        eventoDb.Subject = request.Subject;
        eventoDb.EndTime = string.IsNullOrEmpty(request.EndTime) ? null : DateTime.Parse(request.EndTime);
        eventoDb.RecurrenceRule = request.RecurrenceRule;
        eventoDb.StartTime = string.IsNullOrEmpty(request.StartTime) ? null : DateTime.Parse(request.StartTime);
        eventoDb.IsAllDay = request.IsAllDay;

        await _context.SaveChangesAsync(cancellationToken);

        return eventoDb.Id;
    }
}
