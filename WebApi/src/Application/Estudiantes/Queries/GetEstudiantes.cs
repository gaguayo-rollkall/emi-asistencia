using WebApi.Application.Common.Interfaces;
using WebApi.Application.Common.Security;

namespace Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;

[Authorize]
public record GetEstudiantesQuery(Guid? CursoId) : IRequest<IList<EstudianteDto>>;

public class GetEstudiantesQueryHandler : IRequestHandler<GetEstudiantesQuery, IList<EstudianteDto>>
{
    private readonly IApplicationDbContext _context;

    public GetEstudiantesQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IList<EstudianteDto>> Handle(GetEstudiantesQuery request, CancellationToken cancellationToken)
    {
        if (request.CursoId is not null)
        {
            return await _context
                .CursoEstudiantes
                .AsNoTracking()
                .Where(c => c.CursoId == request.CursoId)
                .Select(c => new EstudianteDto
                {
                    Id = c.Estudiante!.Id,
                    Codigo = c.Estudiante!.Codigo.ToUpper(),
                    Nombre = c.Estudiante!.Nombre.ToUpper(),
                    Email = c.Estudiante!.Email,
                    RFID = c.Estudiante!.RFID,
                })
                .ToListAsync(cancellationToken);
        }

        return await _context
            .Estudiantes
            .AsNoTracking()
            .Select(e => new EstudianteDto
            {
                Id = e.Id, Codigo = e.Codigo.ToUpper(), Nombre = e.Nombre.ToUpper(), Email = e.Email, RFID = e.RFID,
            })
            .ToListAsync(cancellationToken);
    }
}
