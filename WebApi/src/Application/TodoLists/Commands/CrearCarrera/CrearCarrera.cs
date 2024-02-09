using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearCarrera;

public class CrearCarreraCommand : IRequest<Guid>
{
    public string Nombre { get; set; } = default!;
}

public class CrearCarreraCommandHandler : IRequestHandler<CrearCarreraCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CrearCarreraCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CrearCarreraCommand request, CancellationToken cancellationToken)
    {
        var entity = new Carrera { Nombre = request.Nombre };

        _context.Carreras.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
