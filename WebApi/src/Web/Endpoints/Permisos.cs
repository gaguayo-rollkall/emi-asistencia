namespace WebApi.Web.Endpoints;

public class Permisos : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this);
    }
}
