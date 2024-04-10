using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Usuarios.Commands;

public record BorrarInformacionUsuarioCommand(Guid Id) : IRequest;

public class BorrarInformacionUsuarioCommandHandler : IRequestHandler<BorrarInformacionUsuarioCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarInformacionUsuarioCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarInformacionUsuarioCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.UsuarioInformaciones
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.UsuarioInformaciones.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
