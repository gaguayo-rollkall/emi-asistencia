using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Personal : BaseAuditableEntity
{
    public string DocumentoIdentidad { get; set; } = default!;
    public string Nombre { get; set; } = default!;
    public string Apellido { get; set; } = default!;
    public ICollection<PersonalPermiso> PersonalPermisos { get; set; } = new List<PersonalPermiso>();

    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Personal>()
            .HasKey(s => s.Id);
    }
}
