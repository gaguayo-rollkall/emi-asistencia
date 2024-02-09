using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.BorrarCarrera;

public record BorrarCarreraCommand(Guid Id) : IRequest;

public class BorrarCarreraCommandHandler : IRequestHandler<BorrarCarreraCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarCarreraCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarCarreraCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Carreras
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.Carreras.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
