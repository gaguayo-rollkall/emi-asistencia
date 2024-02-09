namespace WebApi.Domain.Entities;

public class Carrera : BaseAuditableEntity
{
    public string Nombre { get; set; } = string.Empty;

    public ICollection<CarreraPeriodo> CarreraPeriodos { get; set; } = new List<CarreraPeriodo>();
}
