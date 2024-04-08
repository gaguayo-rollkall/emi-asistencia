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
    DbSet<Curso> Cursos { get; }
    DbSet<CursoEstudiante> CursoEstudiantes { get; }
    DbSet<EventoCalendario> EventosCalendario { get; }
    DbSet<Ambiente> Ambientes { get; }
    DbSet<Permiso> Permisos { get; }
    DbSet<Personal> Personales { get; }
    DbSet<PersonalPermiso> PersonalPermisos { get; }
    public DbSet<Control> Controles { get; }
    DbSet<UsuarioInformacion> UsuarioInformaciones { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken);
    public IEnumerable<User> GetUsers();
}
