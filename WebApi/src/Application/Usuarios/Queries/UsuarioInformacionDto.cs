using WebApi.Application.Common.Interfaces;
using WebApi.Application.PermisosSeguridad.Queries;

namespace Microsoft.Extensions.DependencyInjection.Controles.Queries;

public class UsuarioInformacionDto : IEntity
{
    public string? UserId { get; set; }
    public string? Nombre { get; set; }
    public string? Detalles { get; set; }
    public Guid Id { get; set; }
    public string? Password { get; set; }
    public Guid? PermisoId { get; set; }
    public PermisoSeguridadDto? PermisoSeguridad { get; set; }
}
