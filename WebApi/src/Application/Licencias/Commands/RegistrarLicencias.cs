using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Licencias.Commands;

public class RegistrarLicenciasCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public string Titulo { get; set; } = string.Empty;
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
    public string? Motivo { get; set; }
    public string? Foto { get; set; }
    public string? Justificacion { get; set; }
    public string? CodigoEstudiante { get; set; }
    public string? Estatus { get; set; } = "Pendiente";
    public string? Carrera { get; set; }
    public string? Semestre { get; set; }
    public string? Autorizado { get; set; }
}

public class RegistrarLicenciasCommandHandler : IRequestHandler<RegistrarLicenciasCommand, bool>
{
    private readonly IApplicationDbContext _context;

    public RegistrarLicenciasCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<bool> Handle(RegistrarLicenciasCommand request, CancellationToken cancellationToken)
    {
        var licenciaDb = await _context.Licencias
            .SingleOrDefaultAsync(e => e.Id == request.Id, cancellationToken);

        if (licenciaDb is null)
        {
            licenciaDb = new Licencia
            {
                Id = request.Id,
            };

            _context.Licencias.Add(licenciaDb);
        }
        
        licenciaDb.Titulo = request.Titulo;
        licenciaDb.FechaInicio = request.FechaInicio;
        licenciaDb.FechaFin = request.FechaFin;
        licenciaDb.Motivo = request.Motivo;
        licenciaDb.Foto = request.Foto;
        licenciaDb.Justificacion = request.Justificacion;
        licenciaDb.CodigoEstudiante = request.CodigoEstudiante;
        licenciaDb.Estatus = request.Estatus;
        licenciaDb.Carrera = request.Carrera;
        licenciaDb.Semestre = request.Semestre;
        licenciaDb.Autorizado = request.Autorizado;

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }
}
