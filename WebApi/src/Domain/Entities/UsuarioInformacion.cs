using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class UsuarioInformacion : BaseAuditableEntity
{
    public string? UserId { get; set; }
    public string? Nombre { get; set; }
    public string? Detalles { get; set; }
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UsuarioInformacion>()
            .HasKey(s => s.Id);
    }
}
