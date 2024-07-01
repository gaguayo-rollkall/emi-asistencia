using Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;
using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Estudiantes.Commands;

public class RegistrarEstudianteCommand : EstudianteDto, IRequest<bool>;

public class RegistrarEstudianteCommandHandler : IRequestHandler<RegistrarEstudianteCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public RegistrarEstudianteCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(RegistrarEstudianteCommand request, CancellationToken cancellationToken)
    {
        var estudianteDb = await _context.Estudiantes
            .FirstOrDefaultAsync(e => e.Codigo == request.Codigo, cancellationToken);

        if (estudianteDb is null)
        {
            estudianteDb = new Estudiante
            {
                Id = request.Id ?? Guid.NewGuid(),
            };
            
            _context.Estudiantes.Add(estudianteDb);
        }
        
        estudianteDb.Grado = request.Grado;
        estudianteDb.Codigo = request.Codigo;
        estudianteDb.Nombre = request.Nombre;
        estudianteDb.Email = request.Email;
        estudianteDb.RFID = request.RFID;
        estudianteDb.Foto = request.Foto;

        if (request.CursoId is not null)
        {
            if (!await _context.CursoEstudiantes.AnyAsync(e => e.CursoId == request.CursoId.Value && e.EstudianteId == estudianteDb.Id, cancellationToken))
            {
                _context.CursoEstudiantes.Add(new CursoEstudiante
                {
                    CursoId = request.CursoId.Value,
                    EstudianteId = estudianteDb.Id,
                });
            }
        }
        
        await _context.SaveChangesAsync(cancellationToken);
        
        return true;
    }
}
