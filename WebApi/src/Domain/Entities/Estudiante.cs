namespace WebApi.Domain.Entities;

public class Estudiante : BaseAuditableEntity
{
    public string Codigo { get; set; } = string.Empty;
    public string RFID { get; set; } = string.Empty;
}
