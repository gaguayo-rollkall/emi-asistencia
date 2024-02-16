using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Curso : BaseAuditableEntity
{
    public Guid CarreraId { get; set; }
    public Guid PeriodoAcademicoId { get; set; }
    public string Nombre { get; set; } = default!;
    public Carrera? Carrera { get; set; }
    public PeriodoAcademico? PeriodoAcademico { get; set; }
    public ICollection<CursoEstudiante> CursoEstudiantes { get; set; } = new List<CursoEstudiante>();
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Curso>()
            .HasKey(s => s.Id);
        
        modelBuilder.Entity<Curso>()
            .HasOne(sc => sc.Carrera)
            .WithMany(s => s.Cursos)
            .HasForeignKey(sc => sc.CarreraId);
        
        modelBuilder.Entity<Curso>()
            .HasOne(sc => sc.PeriodoAcademico)
            .WithMany(s => s.Cursos)
            .HasForeignKey(sc => sc.PeriodoAcademicoId);
    }
}
