using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Carrera : BaseAuditableEntity
{
    public string Nombre { get; set; } = string.Empty;

    public ICollection<CarreraPeriodo> CarreraPeriodos { get; set; } = new List<CarreraPeriodo>();
    public ICollection<Curso> Cursos { get; set; } = new List<Curso>();

    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Carrera>()
            .HasKey(s => s.Id);
    }
}
