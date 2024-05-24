using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;
using WebApi.Application.PermisosSeguridad.Queries;

namespace Microsoft.Extensions.DependencyInjection.Controles.Queries;

[Authorize]
public record GetInformacionUsuariosQuery : IRequest<IList<UsuarioInformacionDto>>;

public class GetInformacionUsuariosQueryHandler : IRequestHandler<GetInformacionUsuariosQuery, IList<UsuarioInformacionDto>>
{
    private readonly IApplicationDbContext _context;

    public GetInformacionUsuariosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<UsuarioInformacionDto>> Handle(GetInformacionUsuariosQuery request, CancellationToken cancellationToken)
    {
        var informaciones = await _context.UsuarioInformaciones
            .AsNoTracking()
            .Select(c => new
            {
                c.Id,
                c.UserId,
                c.Nombre,
                c.Detalles,
                c.PermisoId,
                c.Permiso,
            })
            .OrderBy(c => c.Nombre)
            .ToListAsync(cancellationToken);
        
        return informaciones.Select(c => new UsuarioInformacionDto
        {
            Id = c.Id,
            UserId = c.UserId,
            Nombre = c.Nombre,
            Detalles = c.Detalles,
            PermisoId = c.PermisoId,
            PermisoSeguridad = new PermisoSeguridadDto
            {
                Id = c.Permiso?.Id ?? Guid.Empty,
                Nombre = c.Permiso?.Nombre ?? string.Empty,
                UsuariosSistema = c.Permiso?.UsuariosSistema ?? true,
                Reportes = c.Permiso?.Reportes ?? true,
                Carreras = c.Permiso?.Carreras ?? true,
                PeriodosAcademicos = c.Permiso?.PeriodosAcademicos ?? true,
                Cursos = c.Permiso?.Cursos ?? true,
                Calendario = c.Permiso?.Calendario ?? true,
                Estudiantes = c.Permiso?.Estudiantes ?? true,
                Licencias = c.Permiso?.Licencias ?? true,
                Control = c.Permiso?.Control ?? true,
            }
        }).ToList();
    }
}
