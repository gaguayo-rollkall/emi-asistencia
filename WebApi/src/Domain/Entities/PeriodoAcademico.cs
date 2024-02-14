using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class PeriodoAcademico : BaseAuditableEntity
{
    public string Periodo { get; set; } = string.Empty;
    public int Gestion { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
    public ICollection<CarreraPeriodo> CarreraPeriodos { get; set; } = new List<CarreraPeriodo>();
    public ICollection<Curso> Cursos { get; set; } = new List<Curso>();
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<PeriodoAcademico>()
            .HasKey(s => s.Id);
    }
}
