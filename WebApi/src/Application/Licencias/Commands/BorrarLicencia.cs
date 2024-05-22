using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Licencias.Commands;

public record BorrarLicenciaCommand(Guid Id) : IRequest;

public class BorrarLicenciaCommandHandler : IRequestHandler<BorrarLicenciaCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarLicenciaCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarLicenciaCommand request, CancellationToken cancellationToken)
    {
        var licencia = await _context.Licencias
            .FirstOrDefaultAsync(l => l.Id == request.Id, cancellationToken);

        Guard.Against.NotFound(request.Id, licencia);
        
        _context.Licencias.Remove(licencia);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
