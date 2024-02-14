using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Cursos.Queries.GetCursos;

[Authorize]
public record GetCursoQuery(Guid CursoId) : IRequest<CursoDto?>;

public class GetCursoQueryHandler : IRequestHandler<GetCursoQuery, CursoDto?>
{
    private readonly IApplicationDbContext _context;

    public GetCursoQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<CursoDto?> Handle(GetCursoQuery request, CancellationToken cancellationToken)
    {
        return await _context.Cursos
            .AsNoTracking()
            .Where(c => c.Id == request.CursoId)
            .Select(c => new CursoDto
            {
                Id = c.Id,
                Carrera = c.Carrera!.Nombre,
                Nombre = c.Nombre,
                Gestion = c.PeriodoAcademico!.Gestion,
                Periodo = c.PeriodoAcademico!.Periodo,
            })
            .FirstOrDefaultAsync(cancellationToken);
    }
}
