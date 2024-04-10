using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Controles.Queries;

[Authorize]
public record GetInformacionUsuariosQuery : IRequest<IList<UsuarioInformacionDto>>;

public class GetInformacionUsuariosQueryHandler : IRequestHandler<GetInformacionUsuariosQuery, IList<UsuarioInformacionDto>>
{
    private readonly IApplicationDbContext _context;

    public GetInformacionUsuariosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<UsuarioInformacionDto>> Handle(GetInformacionUsuariosQuery request, CancellationToken cancellationToken)
    {
        return await _context.UsuarioInformaciones
            .AsNoTracking()
            .Select(c => new UsuarioInformacionDto
            {
                Id = c.Id,
                UserId = c.UserId,
                Nombre = c.Nombre,
                Detalles = c.Detalles,
            })
            .OrderBy(c => c.Nombre)
            .ToListAsync(cancellationToken);
    }
}
