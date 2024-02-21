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

    public async Task<IList<RegistroCarreraDto>> GetRegistrosPorCarrera(ISender sender, Guid? carreraId, Guid periodoAcademicoId, string fechaInicio, string fechaFin) =>
        await sender.Send(new GetRegistrosPorCarreraQuery(carreraId, periodoAcademicoId, DateTime.Parse(fechaInicio), DateTime.Parse(fechaFin)));
}
