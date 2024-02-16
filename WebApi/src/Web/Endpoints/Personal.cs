namespace WebApi.Web.Endpoints;

public class Personal : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this);
    }
}
