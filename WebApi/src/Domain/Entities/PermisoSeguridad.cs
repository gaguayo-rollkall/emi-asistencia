using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class PermisoSeguridad : BaseAuditableEntity
{
    public string Nombre { get; set; } = string.Empty;
    
    public bool UsuariosSistema { get; set; }
    public bool Reportes { get; set; }
    public bool Carreras { get; set; }
    public bool PeriodosAcademicos { get; set; }
    public bool Cursos { get; set; }
    public bool Calendario { get; set; }
    public bool Estudiantes { get; set; }
    public bool Licencias { get; set; }
    public bool Control { get; set; }

    public ICollection<UsuarioInformacion> Usuarios { get; set; } = new List<UsuarioInformacion>();
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PermisoSeguridad>()
            .HasKey(s => s.Id);
    }
}
