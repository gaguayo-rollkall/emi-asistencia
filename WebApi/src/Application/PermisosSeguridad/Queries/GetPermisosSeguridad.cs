using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace WebApi.Application.PermisosSeguridad.Queries;

[Authorize]
public class GetPermisosSeguridadQuery : IRequest<IList<PermisoSeguridadDto>>;

public class GetPermisosSeguridadQueryHandler : IRequestHandler<GetPermisosSeguridadQuery, IList<PermisoSeguridadDto>>
{
    private readonly IApplicationDbContext _context;

    public GetPermisosSeguridadQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<PermisoSeguridadDto>> Handle(GetPermisosSeguridadQuery request, CancellationToken cancellationToken)
    {
        return await _context.PermisoSeguridades
            .AsNoTracking()
            .Select(e => new PermisoSeguridadDto
            {
                Id = e.Id,
                UsuariosSistema = e.UsuariosSistema,
                Reportes = e.Reportes,
                Carreras = e.Carreras,
                PeriodosAcademicos = e.PeriodosAcademicos,
                Cursos = e.Cursos,
                Calendario = e.Calendario,
                Estudiantes = e.Estudiantes,
                Licencias = e.Licencias,
                Control = e.Control,
                Created = e.Created,
            })
            .OrderBy(e => e.Nombre)
            .ToListAsync(cancellationToken);
    }
}
