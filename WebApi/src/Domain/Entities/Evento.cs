namespace WebApi.Domain.Entities;

public class Evento : BaseAuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime Inicio { get; set; }
    public DateTime Fin { get; set; }
}
