using Microsoft.Extensions.DependencyInjection.TodoLists.Commands.ActualizarCarrera;
using Microsoft.Extensions.DependencyInjection.TodoLists.Commands.BorrarCarrera;
using Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearCarrera;
using Microsoft.Extensions.DependencyInjection.TodoLists.Queries.GetCarreras;

namespace WebApi.Web.Endpoints;

public class Carreras : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetCarreras)
            .MapPost(CrearCarreras)
            .MapPut(ActualizarCarrera, "{id}")
            .MapDelete(BorrarCarrera, "{id}");
    }

    public async Task<IList<CarreraDto>> GetCarreras(ISender sender) =>
        await sender.Send(new GetCarrerasQuery());

    public async Task<Guid> CrearCarreras(ISender sender, CrearCarreraCommand command) =>
        await sender.Send(command);

    public async Task<IResult> ActualizarCarrera(ISender sender, Guid id, ActualizarCarreraCommand command)
    {
        if (id != command.Id) return Results.BadRequest();
        await sender.Send(command);
        return Results.NoContent();
    }

    public async Task<IResult> BorrarCarrera(ISender sender, Guid id)
    {
        await sender.Send(new BorrarCarreraCommand(id));
        return Results.NoContent();
    }
}
