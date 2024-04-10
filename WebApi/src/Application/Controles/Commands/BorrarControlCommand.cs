using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Controles.Commands;

public record BorrarControlCommand(Guid Id) : IRequest;

public class BorrarControlCommandHandler : IRequestHandler<BorrarControlCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarControlCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarControlCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Controles
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.Controles.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
