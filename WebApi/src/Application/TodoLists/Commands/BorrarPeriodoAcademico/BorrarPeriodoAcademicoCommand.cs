using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.BorrarPeriodoAcademico;

public record BorrarPeriodoAcademicoCommand(Guid Id) : IRequest;

public class BorrarPeriodoAcademicoCommandHandler : IRequestHandler<BorrarPeriodoAcademicoCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarPeriodoAcademicoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarPeriodoAcademicoCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.PeriodoAcademicos
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.PeriodoAcademicos.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
