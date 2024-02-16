namespace WebApi.Web.Endpoints;

public class Ambientes : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this);
    }
}
