using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Asistencia : BaseAuditableEntity
{
    public DateTime Fecha { get; set; }
    public string RFID { get; set; } = string.Empty;
    public string? CodigoEstudiante { get; set; }
    public int? Evento { get; set; }

    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Asistencia>()
            .HasKey(s => s.Id);
    }
}
