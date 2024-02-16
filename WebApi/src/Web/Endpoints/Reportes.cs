namespace WebApi.Web.Endpoints;

public class Reportes : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this);
    }
}
