using Microsoft.Extensions.DependencyInjection.Eventos.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace WebApi.Application.Eventos.Queries;

[Authorize]
public record GetEventoByIdQuery(int Id) : IRequest<EventoDto>;

public class GetEventoByIdQueryHandler : IRequestHandler<GetEventoByIdQuery, EventoDto>
{
    private readonly IApplicationDbContext _context;

    public GetEventoByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<EventoDto> Handle(GetEventoByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.EventosCalendario
            .AsNoTracking()
            .Where(e => e.Id == request.Id)
            .Select(e => new EventoDto
            {
                Id = e.Id,
                StartTime = e.StartTime,
                Description = e.Description,
                Location = e.Location,
                Subject = e.Subject,
                EndTime = e.EndTime,
                RecurrenceRule = e.RecurrenceRule,
                IsAllDay = e.IsAllDay,
            })
            .OrderBy(e => e.StartTime)
            .SingleAsync(cancellationToken);
    }
}
