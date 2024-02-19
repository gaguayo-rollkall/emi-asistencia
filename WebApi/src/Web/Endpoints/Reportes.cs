using System.Collections;
using Microsoft.Extensions.DependencyInjection.Reportes.Queries;

namespace WebApi.Web.Endpoints;

public class Reportes : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapMethods("/registros-carrera", new[] { "GET" }, GetRegistrosPorCarrera);
    }

    public async Task<IList<RegistroCarreraDto>> GetRegistrosPorCarrera(ISender sender, string fechaInicio, string fechaFin) =>
        await sender.Send(new GetRegistrosPorCarreraQuery(DateTime.Parse(fechaInicio), DateTime.Parse(fechaFin)));
}
