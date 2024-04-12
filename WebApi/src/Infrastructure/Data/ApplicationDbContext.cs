using System.Reflection;
using Microsoft.AspNetCore.Identity;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;
using WebApi.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    // private readonly UserManager<ApplicationUser> _userManager;
    
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<ApplicationUser> AppUsers => Set<ApplicationUser>();
    public DbSet<TodoList> TodoLists => Set<TodoList>();
    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    public DbSet<Carrera> Carreras => Set<Carrera>();
    public DbSet<PeriodoAcademico> PeriodoAcademicos => Set<PeriodoAcademico>();
    public DbSet<CarreraPeriodo> CarreraPeriodos => Set<CarreraPeriodo>();
    public DbSet<Estudiante> Estudiantes => Set<Estudiante>();
    public DbSet<Asistencia> Asistencias => Set<Asistencia>();
    public DbSet<Curso> Cursos => Set<Curso>();
    public DbSet<CursoEstudiante> CursoEstudiantes => Set<CursoEstudiante>();
    public DbSet<EventoCalendario> EventosCalendario => Set<EventoCalendario>();
    public DbSet<Ambiente> Ambientes => Set<Ambiente>();
    public DbSet<Permiso> Permisos => Set<Permiso>();
    public DbSet<Personal> Personales => Set<Personal>();
    public DbSet<PersonalPermiso> PersonalPermisos => Set<PersonalPermiso>();
    public DbSet<Control> Controles => Set<Control>();
    public DbSet<UsuarioInformacion> UsuarioInformaciones => Set<UsuarioInformacion>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        Carrera.Map(builder);
        PeriodoAcademico.Map(builder);
        CarreraPeriodo.Map(builder);
        Estudiante.Map(builder);
        Asistencia.Map(builder);
        Curso.Map(builder);
        CursoEstudiante.Map(builder);
        EventoCalendario.Map(builder);
        Ambiente.Map(builder);
        Permiso.Map(builder);
        Personal.Map(builder);
        PersonalPermiso.Map(builder);
        Control.Map(builder);
        UsuarioInformacion.Map(builder);

        base.OnModelCreating(builder);
    }
}
