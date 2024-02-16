using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class PersonalPermiso : BaseAuditableEntity
{
    public Guid PersonalId { get; set; }
    public Guid PermisoId { get; set; }
    public Personal? Personal { get; set; }
    public Permiso? Permiso { get; set; }

    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PersonalPermiso>()
            .HasKey(pp => new { pp.PersonalId, pp.PermisoId });

        modelBuilder.Entity<PersonalPermiso>()
            .HasOne(pp => pp.Personal)
            .WithMany(p => p.PersonalPermisos)
            .HasForeignKey(pp => pp.PersonalId);

        modelBuilder.Entity<PersonalPermiso>()
            .HasOne(pp => pp.Permiso)
            .WithMany(p => p.PersonalPermisos)
            .HasForeignKey(pp => pp.PersonalId);
    }
}
