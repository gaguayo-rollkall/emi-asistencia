using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Controles.Commands;

public class CrearControlCommand : IRequest<Guid>
{
    public Guid? Id { get; set; }
    public string? URL { get; set; }
    public int Tipo { get; set; }
}

public class CrearControlCommandHandler : IRequestHandler<CrearControlCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CrearControlCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CrearControlCommand request, CancellationToken cancellationToken)
    {
        var entity = new Control
        {
            Id = request.Id ?? Guid.NewGuid(),
            URL = request.URL,
            Tipo = request.Tipo
        };

        _context.Controles.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
