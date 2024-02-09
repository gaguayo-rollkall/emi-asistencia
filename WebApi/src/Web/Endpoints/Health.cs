namespace WebApi.Web.Endpoints;

public class Health : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .RequireAuthorization()
            .MapGet(VerificarServicio);
    }

    public Task<bool> VerificarServicio() => Task.FromResult(true);
}
