using Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;
using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Estudiantes.Commands;

public class RemoverEstudianteCommand : EstudianteDto, IRequest<bool>;

public class RemoveEstudianteCommandHandler : IRequestHandler<RemoverEstudianteCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public RemoveEstudianteCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(RemoverEstudianteCommand request, CancellationToken cancellationToken)
    {
        var cursoEstudiante = await _context.CursoEstudiantes
            .FirstOrDefaultAsync(c => c.CursoId == request.CursoId && c.EstudianteId == request.Id);

        if (cursoEstudiante is not null)
        {
            _context.CursoEstudiantes.Remove(cursoEstudiante);
            await _context.SaveChangesAsync(cancellationToken);
            return true;
        }

        return false;
    }
}
