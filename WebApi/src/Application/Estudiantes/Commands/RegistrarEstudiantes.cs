using Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Estudiantes.Commands;

public class RegistrarEstudiantesCommand : IRequest<bool>
{
    public Guid CursoId { get; set; }
    public List<EstudianteDto> Estudiantes { get; set; } = new();
}

public class RegistrarEstudiantesCommandHandler : IRequestHandler<RegistrarEstudiantesCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public RegistrarEstudiantesCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(RegistrarEstudiantesCommand request, CancellationToken cancellationToken)
    {
        foreach (var estudiante in request.Estudiantes)
        {
            if (string.IsNullOrEmpty(estudiante.Codigo))
            {
                continue;
            }
            
            var estudianteDb = await _context
                .Estudiantes
                .FirstOrDefaultAsync(e => e.Codigo == estudiante.Codigo, cancellationToken);

            if (estudianteDb is null)
            {
                estudianteDb = new Estudiante
                {
                    Id = Guid.NewGuid(),
                    Grado = estudiante.Grado,
                    Codigo = estudiante.Codigo,
                    Nombre = estudiante.Nombre,
                    Email = estudiante.Email,
                    RFID = estudiante.RFID,
                    Foto = estudiante.Foto,
                };

                _context.Estudiantes.Add(estudianteDb);
            }

            var cursoEstudiante = new CursoEstudiante
            {
                EstudianteId = estudianteDb.Id, CursoId = request.CursoId,
            };

            _context.CursoEstudiantes.Add(cursoEstudiante);
        }
        
        await _context.SaveChangesAsync(cancellationToken);
        
        return true;
    }
}
