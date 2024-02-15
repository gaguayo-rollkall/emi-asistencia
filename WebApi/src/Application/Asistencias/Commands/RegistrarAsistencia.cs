using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Asistencias.Commands;

public class RegistrarAsistenciaCommand : IRequest<Guid?>
{
    public string? RFID { get; set; }
    public string? CodigoEstudiante { get; set; }
}

public class RegistrarAsistenciaCommandHandler : IRequestHandler<RegistrarAsistenciaCommand, Guid?>
{
    private readonly IApplicationDbContext _context;

    public RegistrarAsistenciaCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid?> Handle(RegistrarAsistenciaCommand request, CancellationToken cancellationToken)
    {
        var estudiante = await _context.Estudiantes
            .AsNoTracking()
            .FirstOrDefaultAsync(e => e.Codigo == request.CodigoEstudiante ||
                                      e.RFID == request.RFID);

        if (estudiante is null)
        {
            return null;
        }
        
        var entity = new Asistencia
        {
            Fecha = DateTime.Now,
            RFID = !string.IsNullOrEmpty(request.RFID) ? request.RFID : string.Empty,
            CodigoEstudiante = request.CodigoEstudiante,
        };

        _context.Asistencias.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
