using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Licencias.Queries;

public class LicenciaDto : Licencia
{
    public string? Nombre { get; set; }
}
