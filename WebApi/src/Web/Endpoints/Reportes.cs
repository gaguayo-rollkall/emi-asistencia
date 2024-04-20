using System.Collections;
using Microsoft.Extensions.DependencyInjection.Reportes.Queries;
using WebApi.Application.Reportes.Queries;

namespace WebApi.Web.Endpoints;

public class Reportes : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetRegistrosPorCarrera, "/registros-carrera")
            .MapGet(GetRegistrosPorEvento, "/registros-evento")
            .MapGet(GetSelectorFechas, "/selector-fechas")
            .MapGet(GetRegistrosMes, "/registros-mes");
    }

    public async Task<IList<RegistroCarreraDto>> GetRegistrosPorCarrera(ISender sender, Guid? carreraId, Guid periodoAcademicoId, Guid cursoId, string fechaInicio, string fechaFin) =>
        await sender.Send(new GetRegistrosPorCarreraQuery(carreraId, periodoAcademicoId, cursoId, DateTime.Parse(fechaInicio), DateTime.Parse(fechaFin)));

    public async Task<IList<RegistroCarreraDto>> GetRegistrosPorEvento(ISender sender,
        Guid? carreraId,
        Guid cursoId,
        Guid periodoAcademicoId, int evento) =>
        await sender.Send(new GetRegistrosPorEventoQuery(carreraId, periodoAcademicoId, cursoId, evento));

    public async Task<IList<SelectorFechaDto>> GetSelectorFechas(ISender sender) => await sender.Send(new GetSelectorFechasQuery());

    public async Task<IList<RegistroMesDto>> GetRegistrosMes(ISender sender) => await sender.Send(new GetRegistrosMesQuery());
}
