using Microsoft.Extensions.DependencyInjection.Eventos.Command;
using Microsoft.Extensions.DependencyInjection.Eventos.Queries;

namespace WebApi.Web.Endpoints;

public class Eventos : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetEventos)
            .MapPost(CrearEventos)
            .MapDelete(BorrarEvento, "{id}");
    }
    
    public async Task<IList<EventoDto>> GetEventos(ISender sender) =>
        await sender.Send(new GetEventosQuery());

    public async Task<int> CrearEventos(ISender sender, CrearEventoCommand command) =>
        await sender.Send(command);

    public async Task<IResult> BorrarEvento(ISender sender, int id)
    {
        await sender.Send(new BorrarEventoCommand(id));
        return Results.NoContent();
    }
}
