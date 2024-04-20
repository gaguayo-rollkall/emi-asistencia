using Microsoft.Extensions.DependencyInjection.Reportes.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace WebApi.Application.Reportes.Queries;

[Authorize]
public class GetSelectorFechasQuery() : IRequest<IList<SelectorFechaDto>>;

public class GetSelectorFechasQueryHandler : IRequestHandler<GetSelectorFechasQuery, IList<SelectorFechaDto>>
{
    private readonly IApplicationDbContext _context;

    public GetSelectorFechasQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<SelectorFechaDto>> Handle(GetSelectorFechasQuery request, CancellationToken cancellationToken)
    {
        var asistencias = await _context.Asistencias
            .AsNoTracking()
            .OrderBy(x => x.Fecha)
            .Select(x => x.Fecha)
            .ToListAsync(cancellationToken);

        return asistencias
            .Select(x => x.ToString("yyyy-MM-dd"))
            .GroupBy(x => x)
            .Select(x => new SelectorFechaDto
            {
                Fecha = x.Key,
                Asistencias = x.Count(),
            })
            .ToList();
    }
}
