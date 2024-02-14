using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Cursos.Queries.GetCursos;

[Authorize]
public record GetCursosQuery(Guid CarreraId, Guid PeriodoId) : IRequest<IList<CursoDto>>;

public class GetCursosQueryHandler : IRequestHandler<GetCursosQuery, IList<CursoDto>>
{
    private readonly IApplicationDbContext _context;

    public GetCursosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<CursoDto>> Handle(GetCursosQuery request, CancellationToken cancellationToken)
    {
        return await _context
            .Cursos
            .AsNoTracking()
            .Where(c => c.CarreraId == request.CarreraId &&
                        c.PeriodoAcademicoId == request.PeriodoId)
            .Select(c => new CursoDto { Id = c.Id, Nombre = c.Nombre, })
            .ToListAsync(cancellationToken);
    }
}
