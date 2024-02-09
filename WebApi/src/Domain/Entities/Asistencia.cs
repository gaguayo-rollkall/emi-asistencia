namespace WebApi.Domain.Entities;

public class Asistencia : BaseAuditableEntity
{
    public DateTime Fecha { get; set; }
    public string RFID { get; set; } = string.Empty;

}
