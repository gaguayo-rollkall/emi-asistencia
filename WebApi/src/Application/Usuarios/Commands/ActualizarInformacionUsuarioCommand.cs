using Microsoft.Extensions.DependencyInjection.Controles.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Usuarios.Commands;

public class ActualizarInformacionUsuarioCommand : UsuarioInformacionDto, IRequest;

public class ActualizarInformacionUsuarioCommandHandler : IRequestHandler<ActualizarInformacionUsuarioCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;
    
    public ActualizarInformacionUsuarioCommandHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
        _identityService = identityService;
    }

    public async Task Handle(ActualizarInformacionUsuarioCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.UsuarioInformaciones.FindAsync(request.Id);
        var isAdd = entity is null;

        if (entity is null)
        {
            entity = new UsuarioInformacion { Id = request.Id, };
            
            _context.UsuarioInformaciones.Add(entity);
            var result = await _identityService.CreateUserAsync(request.UserId!, request.Password!);
        }

        entity.UserId = request.UserId;
        entity.Nombre = request.Nombre;
        entity.Detalles = request.Detalles;
        entity.PermisoId = request.PermisoId;

        if (!isAdd && !string.IsNullOrEmpty(request.Password))
        {
            await _identityService.UpdateUserPasswordAsync(request.UserId!, request.Password);
        }

        await _context.SaveChangesAsync(cancellationToken);
    }
}
