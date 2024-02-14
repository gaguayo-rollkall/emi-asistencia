using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class CarreraPeriodo : BaseAuditableEntity
{
    public Guid CarreraId { get; set; }
    public Guid PeriodoAcademicoId { get; set; }
    
    public Carrera? Carrera { get; set; }
    public PeriodoAcademico? PeriodoAcademico { get; set; }
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<CarreraPeriodo>()
            .HasKey(s => new { s.CarreraId, s.PeriodoAcademicoId });

        modelBuilder.Entity<CarreraPeriodo>()
            .HasOne(x => x.Carrera)
            .WithMany(x => x.CarreraPeriodos)
            .HasForeignKey(x => x.CarreraId);
        
        modelBuilder.Entity<CarreraPeriodo>()
            .HasOne(x => x.PeriodoAcademico)
            .WithMany(x => x.CarreraPeriodos)
            .HasForeignKey(x => x.PeriodoAcademicoId);
    }
}
