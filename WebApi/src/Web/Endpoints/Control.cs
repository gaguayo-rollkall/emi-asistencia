using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection.Controles.Commands;
using Microsoft.Extensions.DependencyInjection.Controles.Queries;

namespace WebApi.Web.Endpoints;

public class Control : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetControles)
            .MapPost(CrearControl)
            .MapDelete(BorrarControl, "{id}");
    }
    
    [AllowAnonymous]
    public async Task<IList<ControlDto>> GetControles(ISender sender) =>
        await sender.Send(new GetControlesQuery());
    
    public async Task<Guid> CrearControl(ISender sender, CrearControlCommand command) =>
        await sender.Send(command);

    public async Task<IResult> BorrarControl(ISender sender, Guid id)
    {
        await sender.Send(new BorrarControlCommand(id));
        return Results.NoContent();
    }
}
