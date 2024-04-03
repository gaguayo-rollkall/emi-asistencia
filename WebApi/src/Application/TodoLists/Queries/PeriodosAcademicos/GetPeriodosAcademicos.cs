using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Queries.PeriodosAcademicos;

[Authorize]
public record GetPeriodosAcademicosQuery : IRequest<IList<PeriodoAcademicoDTO>>;

public class GetPeriodosAcademicosQueryHandler : IRequestHandler<GetPeriodosAcademicosQuery, IList<PeriodoAcademicoDTO>>
{
    private readonly IApplicationDbContext _context;

    public GetPeriodosAcademicosQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<PeriodoAcademicoDTO>> Handle(GetPeriodosAcademicosQuery request, CancellationToken cancellationToken)
    {
        return await _context.PeriodoAcademicos
            .AsNoTracking()
            .GroupBy(p => new { p.Gestion })
            .Select(p => new PeriodoAcademicoDTO
            {
                Gestion = p.Key.Gestion,
                Periodos = p.Select(s => new PeriodoDTO
                {
                    Id = s.Id,
                    Gestion = s.Gestion,
                    Periodo = s.Periodo.ToUpper(),
                    FechaInicio = s.FechaInicio,
                    FechaFin = s.FechaFin,
                })
                .OrderBy(s => s.Periodo)
                .ToList()
            })
            .ToListAsync(cancellationToken);
    }
}
