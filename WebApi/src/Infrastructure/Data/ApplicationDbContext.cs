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

    protected override void OnModelCreating(ModelBuilder builder)
    {
        builder.ApplyConfigurationsFromAssembly(Assembly.GetExecutingAssembly());
        
        builder.Entity<CarreraPeriodo>()
            .HasKey(cp => new { cp.CarreraId, cp.PeriodoAcademicoId });

        builder.Entity<CarreraPeriodo>()
            .HasOne(cp => cp.Carrera)
            .WithMany(c => c.CarreraPeriodos)
            .HasForeignKey(cp => cp.CarreraId);

        builder.Entity<CarreraPeriodo>()
            .HasOne(cp => cp.PeriodoAcademico)
            .WithMany(p => p.CarreraPeriodos)
            .HasForeignKey(cp => cp.PeriodoAcademicoId);

        base.OnModelCreating(builder);
    }
}
