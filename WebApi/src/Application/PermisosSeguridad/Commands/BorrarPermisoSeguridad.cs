using WebApi.Application.Common.Interfaces;

namespace WebApi.Application.PermisosSeguridad.Commands;

public record BorrarPermisoSeguridadCommand(Guid Id) : IRequest;

public class BorrarPermisoSeguridadCommandHandler : IRequestHandler<BorrarPermisoSeguridadCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarPermisoSeguridadCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarPermisoSeguridadCommand request, CancellationToken cancellationToken)
    {
        var permiso = await _context.PermisoSeguridades
            .FirstOrDefaultAsync(p => p.Id == request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, permiso);
        
        _context.PermisoSeguridades.Remove(permiso);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
