using Microsoft.Extensions.DependencyInjection.Controles.Queries;
using Microsoft.Extensions.DependencyInjection.Usuarios.Commands;
using Microsoft.Extensions.DependencyInjection.Usuarios.Queries;
using WebApi.Infrastructure.Identity;

namespace WebApi.Web.Endpoints;

public class Users : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetUsuarios)
            .MapGet(GetInformacionUsuarios, "/informacion-usuarios")
            .MapPut(ActualizarInformacionUsuario, "/informacion-usuarios/{id}")
            .MapDelete(BorrarInformacionUsuario, "/informacion-usuarios/{id}")
            .MapIdentityApi<ApplicationUser>();
    }

    public async Task<IList<UsuarioInformacionDto>> GetInformacionUsuarios(ISender sender) =>
        await sender.Send(new GetInformacionUsuariosQuery());
    
    public async Task<IResult> ActualizarInformacionUsuario(ISender sender, Guid id, ActualizarInformacionUsuarioCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }
    
    public async Task<IResult> BorrarInformacionUsuario(ISender sender, Guid id)
    {
        await sender.Send(new BorrarInformacionUsuarioCommand(id));
        return Results.NoContent();
    }

    public async Task<IList<UsuarioDto>> GetUsuarios(ISender sender) =>
        await sender.Send(new GetUsuariosQuery());
}
