using System.Reflection;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;
using WebApi.Infrastructure.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace WebApi.Infrastructure.Data;

public class ApplicationDbContext : IdentityDbContext<ApplicationUser>, IApplicationDbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

    public DbSet<TodoList> TodoLists => Set<TodoList>();
    public DbSet<TodoItem> TodoItems => Set<TodoItem>();
    public DbSet<Carrera> Carreras => Set<Carrera>();
    public DbSet<PeriodoAcademico> PeriodoAcademicos => Set<PeriodoAcademico>();
    public DbSet<CarreraPeriodo> CarreraPeriodos => Set<CarreraPeriodo>();
    public DbSet<Estudiante> Estudiantes => Set<Estudiante>();
    public DbSet<Asistencia> Asistencias => Set<Asistencia>();
    public DbSet<Evento> Eventos => Set<Evento>();
    public DbSet<Curso> Cursos => Set<Curso>();

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        Carrera.Map(builder);
        PeriodoAcademico.Map(builder);
        CarreraPeriodo.Map(builder);
        Estudiante.Map(builder);
        Asistencia.Map(builder);
        Evento.Map(builder);
        Curso.Map(builder);

        base.OnModelCreating(builder);
    }
}
