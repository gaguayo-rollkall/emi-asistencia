using Microsoft.Extensions.DependencyInjection.Usuarios.Queries;
using WebApi.Infrastructure.Identity;

namespace WebApi.Web.Endpoints;

public class Users : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetUsuarios)
            .MapIdentityApi<ApplicationUser>();
    }

    public async Task<IList<UsuarioDto>> GetUsuarios(ISender sender) =>
        await sender.Send(new GetUsuariosQuery());
}
