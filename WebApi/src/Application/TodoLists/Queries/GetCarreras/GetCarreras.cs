using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Queries.GetCarreras;

[Authorize]
public record GetCarrerasQuery : IRequest<IList<CarreraDto>>;

public class GetCarrerasQueryHandler : IRequestHandler<GetCarrerasQuery, IList<CarreraDto>>
{
    private readonly IApplicationDbContext _context;

    public GetCarrerasQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<CarreraDto>> Handle(GetCarrerasQuery request, CancellationToken cancellationToken)
    {
        return await _context.Carreras
            .AsNoTracking()
            .Select(c => new CarreraDto
            {
                Id = c.Id,
                Nombre = c.Nombre.ToUpper(),
            })
            .OrderBy(c => c.Nombre)
            .ToListAsync(cancellationToken);
    }
}
