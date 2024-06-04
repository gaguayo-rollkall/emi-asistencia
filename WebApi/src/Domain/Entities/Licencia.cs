using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Licencia : BaseAuditableEntity
{
    public string Titulo { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
    public string? Motivo { get; set; }
    public string? Foto { get; set; }
    public string? Justificacion { get; set; }
    public string? CodigoEstudiante { get; set; }
    public string? Estatus { get; set; } = "Pendiente";
    public string? Carrera { get; set; }
    public string? Semestre { get; set; }
    public string? Autorizado { get; set; }

    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Licencia>()
            .HasKey(s => s.Id);
    }
}
