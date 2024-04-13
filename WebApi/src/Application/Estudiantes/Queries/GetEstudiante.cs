using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;

public record GetEstudianteQuery(string? codigo) : IRequest<EstudianteDto?>;

public class GetEstudianteQueryHandler : IRequestHandler<GetEstudianteQuery, EstudianteDto?>
{
    private readonly IApplicationDbContext _context;

    public GetEstudianteQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<EstudianteDto?> Handle(GetEstudianteQuery request, CancellationToken cancellationToken)
    {
        var entity = await _context.Estudiantes
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Codigo == request.codigo, cancellationToken);

        return entity is null
            ? null
            : new EstudianteDto
            {
                Id = entity.Id,
                Codigo = entity.Codigo.ToUpper(),
                Grado = entity.Grado,
                Nombre = entity.Nombre.ToUpper(),
                Email = entity.Email,
                RFID = entity.RFID,
                Foto = entity.Foto,
            };
    }
}

