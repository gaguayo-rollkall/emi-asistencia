using Microsoft.Extensions.DependencyInjection.Eventos.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Eventos.Command;

public class CrearEventoCommand : EventoDto, IRequest<int>;


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
            .SingleOrDefaultAsync(cancellationToken);

        if (eventoDb is null)
        {
            eventoDb = new EventoCalendario
            {
                Id = request.Id,
                Description = request.Description,
                Location = request.Location,
                Subject = request.Subject,
                EndTime = request.EndTime,
                RecurrenceRule = request.RecurrenceRule,
                StartTime = request.StartTime,
                IsAllDay = request.IsAllDay,
            };

            _context.EventosCalendario.Add(eventoDb);
        }
        else
        {
            eventoDb.Description = request.Description;
            eventoDb.Location = request.Location;
            eventoDb.Subject = request.Subject;
            eventoDb.EndTime = request.EndTime;
            eventoDb.RecurrenceRule = request.RecurrenceRule;
            eventoDb.StartTime = request.StartTime;
            eventoDb.IsAllDay = request.IsAllDay;
        }

        await _context.SaveChangesAsync(cancellationToken);

        return eventoDb.Id;
    }
}
