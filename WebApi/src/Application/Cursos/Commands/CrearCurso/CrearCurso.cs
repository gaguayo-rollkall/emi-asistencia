using Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearCarrera;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Cursos.Commands.CrearCurso;

public class CrearCursoCommand : IRequest<Guid>
{
    public Guid? Id { get; set; }
    public Guid CarreraId { get; set; }
    public Guid PeriodoId { get; set; }
    public string Nombre { get; set; } = default!;
}

public class CrearCursoCommandHandler : IRequestHandler<CrearCursoCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CrearCursoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CrearCursoCommand request, CancellationToken cancellationToken)
    {
        var curso = await _context
            .Cursos
            .SingleOrDefaultAsync(c => c.Id == request.Id, cancellationToken);

        if (curso is not null)
        {
            curso.Nombre = request.Nombre;
        }
        else
        {
            curso = new Curso
            {
                CarreraId = request.CarreraId, PeriodoAcademicoId = request.PeriodoId, Nombre = request.Nombre,
            };
            
            _context.Cursos.Add(curso);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return curso.Id;
    }
}
