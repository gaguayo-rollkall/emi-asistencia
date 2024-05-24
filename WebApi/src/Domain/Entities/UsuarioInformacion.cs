using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class UsuarioInformacion : BaseAuditableEntity
{
    public string? UserId { get; set; }
    public string? Nombre { get; set; }
    public string? Detalles { get; set; }
    public Guid? PermisoId { get; set; }
    public PermisoSeguridad? Permiso { get; set; }
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<UsuarioInformacion>()
            .HasKey(s => s.Id);
        
        modelBuilder.Entity<UsuarioInformacion>()
            .HasOne(sc => sc.Permiso)
            .WithMany(s => s.Usuarios)
            .HasForeignKey(sc => sc.PermisoId);
    }
}
