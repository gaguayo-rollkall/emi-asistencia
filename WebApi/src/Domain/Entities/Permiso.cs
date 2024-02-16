using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Permiso : BaseAuditableEntity
{
    public string Nombre { get; set; } = default!;
    public ICollection<PersonalPermiso> PersonalPermisos { get; set; } = new List<PersonalPermiso>();
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Permiso>()
            .HasKey(s => s.Id);
    }
}
