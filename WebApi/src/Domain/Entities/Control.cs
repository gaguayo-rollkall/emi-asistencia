using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Control : BaseAuditableEntity
{
    public string? URL { get; set; }
    // 0 = Foto
    // 1 = Video
    public int Tipo { get; set; } = 0;
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Control>()
            .HasKey(s => s.Id);
    }
}
