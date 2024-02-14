using WebApi.Domain.Entities;

namespace WebApi.Application.Common.Interfaces;

public interface IApplicationDbContext
{
    DbSet<TodoList> TodoLists { get; }
    DbSet<TodoItem> TodoItems { get; }
    DbSet<Carrera> Carreras { get; }
    DbSet<PeriodoAcademico> PeriodoAcademicos { get; }
    DbSet<CarreraPeriodo> CarreraPeriodos { get; }
    DbSet<Estudiante> Estudiantes { get; }
    DbSet<Asistencia> Asistencias { get; }
    DbSet<Evento> Eventos { get; }
    DbSet<Curso> Cursos { get; }
    DbSet<CursoEstudiante> CursoEstudiantes { get; }
    
    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
}
