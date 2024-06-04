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

        if (entity is null)
        {
            return null;
        }

        var cursoEstudiantes = await _context.CursoEstudiantes
            .Where(x => x.EstudianteId == entity.Id)
            .Select(x => new
            {
                Carrera = x.Curso!.Carrera!.Nombre,
                Semestre = x.Curso!.Nombre,
            })
            .ToListAsync(cancellationToken);

        return new EstudianteDto
        {
            Id = entity.Id,
            Codigo = entity.Codigo.ToUpper(),
            Grado = entity.Grado,
            Nombre = entity.Nombre.ToUpper(),
            Email = entity.Email,
            RFID = entity.RFID,
            Foto = entity.Foto,
            Carreras = cursoEstudiantes.Select(x => x.Carrera)
                .ToHashSet(),
            Semestres = cursoEstudiantes.Select(x => x.Semestre)
                .ToHashSet(),
        };
    }
}

