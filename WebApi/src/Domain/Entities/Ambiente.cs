using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Ambiente : BaseAuditableEntity
{
    public string Nombre { get; set; } = default!;
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Ambiente>()
            .HasKey(s => s.Id);
    }
}
