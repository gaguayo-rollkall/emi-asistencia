using System.Collections;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class Estudiante : BaseAuditableEntity
{
    public string Nombre { get; set; } = string.Empty;
    public string Codigo { get; set; } = string.Empty;
    public string RFID { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public ICollection<CursoEstudiante> Cursos { get; set; } = new List<CursoEstudiante>();
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Estudiante>()
            .HasKey(s => s.Id);
    }
}
