using Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;
using WebApi.Application.Common.Interfaces;

namespace WebApi.Application.Estudiantes.Commands;

public record BorrarEstudianteCommand(Guid Id): IRequest;

public class BorrarEstudianteCommandHandler : IRequestHandler<BorrarEstudianteCommand>
{
    private readonly IApplicationDbContext _context;

    public BorrarEstudianteCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(BorrarEstudianteCommand request, CancellationToken cancellationToken)
    {
        var estudiante = await _context.Estudiantes
            .Where(e => e.Id == request.Id)
            .SingleOrDefaultAsync(cancellationToken);

        Guard.Against.NotFound(request.Id, estudiante);

        _context.CursoEstudiantes
            .RemoveRange(_context.CursoEstudiantes.Where(e => e.EstudianteId == estudiante.Id));

        _context.Estudiantes.Remove(estudiante);

        await _context.SaveChangesAsync(cancellationToken);
    }
}
