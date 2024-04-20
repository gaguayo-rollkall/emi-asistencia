using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace WebApi.Application.Reportes.Queries;

[Authorize]
public class GetRegistrosMesQuery() : IRequest<IList<RegistroMesDto>>;

public class GetRegistrosMesQueryHandler : IRequestHandler<GetRegistrosMesQuery, IList<RegistroMesDto>>
{
    private readonly IApplicationDbContext _context;

    public GetRegistrosMesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<RegistroMesDto>> Handle(GetRegistrosMesQuery request, CancellationToken cancellationToken)
    {
        var year = DateTime.Now.Year;
        var asistencias = await _context.Asistencias
            .AsNoTracking()
            .Select(x => x.Fecha)
            .ToListAsync(cancellationToken);

        var enero = 0;
        var febrero = 0;
        var marzo = 0;
        var abril = 0;
        var mayo = 0;
        var junio = 0;
        var julio = 0;
        var agosto = 0;
        var septiembre = 0;
        var octubre = 0;
        var noviembre = 0;
        var diciembre = 0;

        foreach (var asistencia in asistencias)
        {
            if (asistencia.Month == 1)
            {
                enero += 1;
            }

            if (asistencia.Month == 2)
            {
                febrero += 1;
            }

            if (asistencia.Month == 3)
            {
                marzo += 1;
            }

            if (asistencia.Month == 4)
            {
                abril += 1;
            }

            if (asistencia.Month == 5)
            {
                mayo += 1;
            }

            if (asistencia.Month == 6)
            {
                junio += 1;
            }

            if (asistencia.Month == 7)
            {
                julio += 1;
            }

            if (asistencia.Month == 8)
            {
                agosto += 1;
            }

            if (asistencia.Month == 9)
            {
                septiembre += 1;
            }

            if (asistencia.Month == 10)
            {
                octubre += 1;
            }

            if (asistencia.Month == 11)
            {
                noviembre += 1;
            }

            if (asistencia.Month == 12)
            {
                diciembre += 1;
            }
        }

        return new List<RegistroMesDto>
        {
            new RegistroMesDto("Enero", enero),
            new RegistroMesDto("Febrero", febrero),
            new RegistroMesDto("Marzo", marzo),
            new RegistroMesDto("Abril", abril),
            new RegistroMesDto("Mayo", mayo),
            new RegistroMesDto("Junio", junio),
            new RegistroMesDto("Julio", julio),
            new RegistroMesDto("Agosto", agosto),
            new RegistroMesDto("Septiembre", septiembre),
            new RegistroMesDto("Octubre", octubre),
            new RegistroMesDto("Noviembre", noviembre),
            new RegistroMesDto("Diciembre", diciembre),
        };
    }
}
