using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Licencia : BaseAuditableEntity
{
    public string Titulo { get; set; } = string.Empty;
    public DateTime Fecha { get; set; }
    public string? Motivo { get; set; }
    public string? Foto { get; set; }
    public string? Justificacion { get; set; }
    public string? CodigoEstudiante { get; set; }
    public string? Estatus { get; set; } = "Pendiente";

    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Licencia>()
            .HasKey(s => s.Id);
    }
}
