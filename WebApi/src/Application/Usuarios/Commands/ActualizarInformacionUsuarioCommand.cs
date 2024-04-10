using Microsoft.Extensions.DependencyInjection.Controles.Queries;
using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Usuarios.Commands;

public class ActualizarInformacionUsuarioCommand : UsuarioInformacionDto, IRequest;

public class ActualizarInformacionUsuarioCommandHandler : IRequestHandler<ActualizarInformacionUsuarioCommand>
{
    private readonly IApplicationDbContext _context;

    public ActualizarInformacionUsuarioCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(ActualizarInformacionUsuarioCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.UsuarioInformaciones.FindAsync(request.Id);

        Guard.Against.NotFound(request.Id, entity);

        entity.UserId = request.UserId;
        entity.Nombre = request.Nombre;
        entity.Detalles = request.Detalles;

        await _context.SaveChangesAsync(cancellationToken);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
