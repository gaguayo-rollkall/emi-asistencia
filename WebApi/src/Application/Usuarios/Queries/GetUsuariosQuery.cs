using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Usuarios.Queries;

public record GetUsuariosQuery : IRequest<List<UsuarioDto>>;

public class GetUsuariosQueryHandler : IRequestHandler<GetUsuariosQuery, List<UsuarioDto>>
{
    private readonly IApplicationDbContext _context;

    public GetUsuariosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public Task<List<UsuarioDto>> Handle(GetUsuariosQuery request, CancellationToken cancellationToken)
    {
        var users = _context.GetUsers().Select(u => new UsuarioDto
        {
            Id = u.Id, UserName = u.UserName, Email = u.Email, Nombre = u.Nombre,
        }).ToList();

        return Task.FromResult(users);
    }
}
