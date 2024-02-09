using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Queries.GetCarreras;

public class CarreraDto : IEntity
{
    public string Nombre { get; set; } = string.Empty;
    public Guid Id { get; set; } = Guid.NewGuid();
}
