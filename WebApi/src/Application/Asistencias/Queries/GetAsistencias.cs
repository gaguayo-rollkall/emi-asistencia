using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Asistencias.Queries;

[Authorize]
public record GetAsistenciasQuery : IRequest<IList<AsistenciaDto>>;

public class GetAsistenciasQueryHandler : IRequestHandler<GetAsistenciasQuery, IList<AsistenciaDto>>
{
    private readonly IApplicationDbContext _context;

    public GetAsistenciasQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<AsistenciaDto>> Handle(GetAsistenciasQuery request, CancellationToken cancellationToken)
    {
        return await _context.Asistencias
            .AsNoTracking()
            .Select(a => new AsistenciaDto { RFID = a.RFID, Fecha = a.Fecha, CodigoEstudiante = a.CodigoEstudiante, })
            .OrderBy(a => a.Fecha)
            .ToListAsync(cancellationToken);
    }
}
