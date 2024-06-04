using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Licencias.Queries;

[Authorize]
public class GetLicenciasQuery : IRequest<IList<LicenciaDto>>;

public class GetLicenciasQueryHandler : IRequestHandler<GetLicenciasQuery, IList<LicenciaDto>>
{
    private readonly IApplicationDbContext _context;

    public GetLicenciasQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<LicenciaDto>> Handle(GetLicenciasQuery request, CancellationToken cancellationToken)
    {
        return await _context.Licencias
            .AsNoTracking()
            .Select(e => new LicenciaDto
            {
                Id = e.Id,
                FechaInicio = e.FechaInicio,
                FechaFin = e.FechaFin,
                Motivo = e.Motivo,
                Foto = e.Foto,
                Estatus = e.Estatus,
                Justificacion = e.Justificacion,
                CodigoEstudiante = e.CodigoEstudiante,
                Nombre = _context.Estudiantes.FirstOrDefault(x => x.Codigo == e.CodigoEstudiante)!.Nombre,
                Titulo = e.Titulo,
                Created = e.Created,
                Autorizado = e.Autorizado,
                Carrera = e.Carrera,
                Semestre = e.Semestre,
            })
            .OrderBy(e => e.Created)
            .ToListAsync(cancellationToken);
    }
}
