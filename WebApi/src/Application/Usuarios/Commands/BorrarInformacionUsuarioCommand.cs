using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Usuarios.Commands;

public record BorrarInformacionUsuarioCommand(Guid Id) : IRequest;

public class BorrarInformacionUsuarioCommandHandler : IRequestHandler<BorrarInformacionUsuarioCommand>
{
    private readonly IApplicationDbContext _context;
    private readonly IIdentityService _identityService;

    public BorrarInformacionUsuarioCommandHandler(IApplicationDbContext context, IIdentityService identityService)
    {
        _context = context;
        _identityService = identityService;
    }

    public async Task Handle(BorrarInformacionUsuarioCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.UsuarioInformaciones
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        await _identityService.DeleteUserByEmailAsync(entity.UserId!);
        _context.UsuarioInformaciones.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
