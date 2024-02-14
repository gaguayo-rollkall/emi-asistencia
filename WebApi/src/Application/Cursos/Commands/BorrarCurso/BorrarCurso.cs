using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Cursos.Commands.BorrarCurso;

public record BorrarCursoCommand(Guid Id) : IRequest;

public class BorrarCursoCommandCommandHandler : IRequestHandler<BorrarCursoCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarCursoCommandCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarCursoCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Cursos
            .Where(l => l.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, entity);

        _context.Cursos.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
