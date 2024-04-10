using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Controles.Queries;

public class ControlDto : IEntity
{
    public string? URL { get; set; }
    public int Tipo { get; set; } = 0;
    public Guid Id { get; set; }
}
