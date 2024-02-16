using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class CursoEstudiante : BaseAuditableEntity
{
    public Guid CursoId { get; set; }
    public Guid EstudianteId { get; set; }

    public Curso? Curso { get; set; }
    public Estudiante? Estudiante { get; set; }
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CursoEstudiante>()
            .HasKey(s => new { s.CursoId, s.EstudianteId });
        
        modelBuilder.Entity<CursoEstudiante>()
            .HasOne(sc => sc.Estudiante)
            .WithMany(s => s.Cursos)
            .HasForeignKey(sc => sc.EstudianteId);
        
        modelBuilder.Entity<CursoEstudiante>()
            .HasOne(sc => sc.Curso)
            .WithMany(s => s.CursoEstudiantes)
            .HasForeignKey(sc => sc.CursoId);
    }
}
