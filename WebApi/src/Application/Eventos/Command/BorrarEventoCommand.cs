using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Eventos.Command;

public record BorrarEventoCommand(int Id) : IRequest;

public class BorrarEventoCommandHandler : IRequestHandler<BorrarEventoCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarEventoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarEventoCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.EventosCalendario
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.EventosCalendario.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
