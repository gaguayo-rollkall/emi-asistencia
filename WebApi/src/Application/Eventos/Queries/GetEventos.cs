using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Eventos.Queries;

[Authorize]
public class GetEventosQuery : IRequest<IList<EventoDto>>;

public class GetEventosQueryHandler : IRequestHandler<GetEventosQuery, IList<EventoDto>>
{
    private readonly IApplicationDbContext _context;

    public GetEventosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<EventoDto>> Handle(GetEventosQuery request, CancellationToken cancellationToken)
    {
        return await _context.EventosCalendario
            .AsNoTracking()
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
            .ToListAsync(cancellationToken);
    }
}
