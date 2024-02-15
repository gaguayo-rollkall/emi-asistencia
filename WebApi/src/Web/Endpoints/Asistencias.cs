using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection.Asistencias.Commands;
using Microsoft.Extensions.DependencyInjection.Asistencias.Queries;

namespace WebApi.Web.Endpoints;

public class Asistencias : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetAsistencias)
            .MapPost(RegistrarAsistencia);
    }

    public async Task<IList<AsistenciaDto>> GetAsistencias(ISender sender)
        => await sender.Send(new GetAsistenciasQuery());

    [AllowAnonymous]
    public async Task<IResult> RegistrarAsistencia(ISender sender, RegistrarAsistenciaCommand command)
    {
        var asistencia = await sender.Send(command);

        if (asistencia is null)
        {
            return Results.BadRequest();
        }

        return Results.NoContent();
    }
}
