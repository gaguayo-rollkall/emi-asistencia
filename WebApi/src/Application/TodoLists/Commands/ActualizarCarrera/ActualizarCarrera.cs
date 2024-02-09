using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.ActualizarCarrera;

public class ActualizarCarreraCommand : IRequest
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = default!;
}

public class ActualizarCarreraCommandHandler : IRequestHandler<ActualizarCarreraCommand>
{
    private readonly IApplicationDbContext _context;

    public ActualizarCarreraCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(ActualizarCarreraCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Carreras
            .FindAsync(new object[] { request.Id }, cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        entity.Nombre = request.Nombre;

        await _context.SaveChangesAsync(cancellationToken);
    }
}
