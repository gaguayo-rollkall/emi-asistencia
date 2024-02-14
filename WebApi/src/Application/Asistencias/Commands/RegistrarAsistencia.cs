using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Asistencias.Commands;

public class RegistrarAsistenciaCommand : IRequest<Guid>
{
    public DateTime Fecha { get; set; }
    public string? RFID { get; set; }
    public string? CodigoEstudiante { get; set; }
}

public class RegistrarAsistenciaCommandHandler : IRequestHandler<RegistrarAsistenciaCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public RegistrarAsistenciaCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(RegistrarAsistenciaCommand request, CancellationToken cancellationToken)
    {
        var entity = new Asistencia
        {
            Fecha = request.Fecha,
            RFID = !string.IsNullOrEmpty(request.RFID) ? request.RFID : string.Empty,
            CodigoEstudiante = request.CodigoEstudiante,
        };

        _context.Asistencias.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
