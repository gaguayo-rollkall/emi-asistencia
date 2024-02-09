using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Queries.GetCarreras;

[Authorize]
public record GetCarrerasQuery : IRequest<IList<CarreraDto>>;

public class GetTodosQueryHandler : IRequestHandler<GetCarrerasQuery, IList<CarreraDto>>
{
    private readonly IApplicationDbContext _context;
    private readonly IMapper _mapper;

    public GetTodosQueryHandler(IApplicationDbContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public async Task<IList<CarreraDto>> Handle(GetCarrerasQuery request, CancellationToken cancellationToken)
    {
        return await _context.Carreras
            .AsNoTracking()
            .Select(c => new CarreraDto
            {
                Id = c.Id,
                Nombre = c.Nombre,
            })
            .OrderBy(c => c.Nombre)
            .ToListAsync(cancellationToken);
    }
}
