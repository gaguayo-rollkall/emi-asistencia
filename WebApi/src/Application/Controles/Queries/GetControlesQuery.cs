using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Controles.Queries;

public record GetControlesQuery : IRequest<IList<ControlDto>>;

public class GetControlesQueryHandler : IRequestHandler<GetControlesQuery, IList<ControlDto>>
{
    private readonly IApplicationDbContext _context;

    public GetControlesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<ControlDto>> Handle(GetControlesQuery request, CancellationToken cancellationToken)
    {
        return await _context.Controles
            .AsNoTracking()
            .Select(c => new ControlDto
            {
                Id = c.Id,
                URL = c.URL,
                Tipo = c.Tipo,
            })
            .ToListAsync(cancellationToken);
    }
}
