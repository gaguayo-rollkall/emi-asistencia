using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace WebApi.Application.PermisosSeguridad.Commands;

public class RegistrarPermisosSeguridadCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public bool UsuariosSistema { get; set; }
    public bool Reportes { get; set; }
    public bool Carreras { get; set; }
    public bool PeriodosAcademicos { get; set; }
    public bool Cursos { get; set; }
    public bool Calendario { get; set; }
    public bool Estudiantes { get; set; }
    public bool Licencias { get; set; }
    public bool Control { get; set; }
}

public class RegistrarPermisosSeguridadHandler : IRequestHandler<RegistrarPermisosSeguridadCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public RegistrarPermisosSeguridadHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(RegistrarPermisosSeguridadCommand request, CancellationToken cancellationToken)
    {
        var permisoDb = await _context.PermisoSeguridades
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (permisoDb is null)
        {
            permisoDb = new PermisoSeguridad
            {
                Id = request.Id,
            };

            _context.PermisoSeguridades.Add(permisoDb);
        }

        permisoDb.Nombre = request.Nombre;
        permisoDb.UsuariosSistema = request.UsuariosSistema;
        permisoDb.Reportes = request.Reportes;
        permisoDb.Carreras = request.Carreras;
        permisoDb.PeriodosAcademicos = request.PeriodosAcademicos;
        permisoDb.Cursos = request.Cursos;
        permisoDb.Calendario = request.Calendario;
        permisoDb.Estudiantes = request.Estudiantes;
        permisoDb.Licencias = request.Licencias;
        permisoDb.Control = request.Control;

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
