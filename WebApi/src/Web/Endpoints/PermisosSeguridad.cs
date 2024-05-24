
using WebApi.Application.PermisosSeguridad.Commands;
using WebApi.Application.PermisosSeguridad.Queries;

namespace WebApi.Web.Endpoints;

public class PermisosSeguridad : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetPermisos)
            .MapPost(RegistrarPermisos)
            .MapDelete(RemoverPermiso, "{id}");
    }
    
    public async Task<IList<PermisoSeguridadDto>> GetPermisos(ISender sender) =>
        await sender.Send(new GetPermisosSeguridadQuery());
    
    public async Task<bool> RegistrarPermisos(ISender sender, RegistrarPermisosSeguridadCommand command) =>
        await sender.Send(command);

    public async Task RemoverPermiso(ISender sender, Guid id)
    {
        await sender.Send(new BorrarPermisoSeguridadCommand(id));
    }
}
