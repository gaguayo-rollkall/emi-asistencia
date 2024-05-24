using Microsoft.Extensions.DependencyInjection.Licencias.Commands;
using Microsoft.Extensions.DependencyInjection.Licencias.Queries;

namespace WebApi.Web.Endpoints;

public class Licencias : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetLicencias)
            .MapPost(RegistrarLicencias)
            .MapDelete(RemoverLicencia, "{id}");
    }
    
    public async Task<IList<LicenciaDto>> GetLicencias(ISender sender) =>
        await sender.Send(new GetLicenciasQuery());
    
    public async Task<bool> RegistrarLicencias(ISender sender, RegistrarLicenciasCommand command) =>
        await sender.Send(command);

    public async Task RemoverLicencia(ISender sender, Guid id)
    {
        await sender.Send(new BorrarLicenciaCommand(id));
    }
}
