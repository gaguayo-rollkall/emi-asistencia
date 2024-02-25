using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearPeriodoAcademico;

public class CrearActualizarPeriodoAcademicoCommand : IRequest<Guid>
{
    public Guid? Id { get; set; }
    public string Periodo { get; set; } = default!;
    public int Gestion { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
}

public class CrearPeriodoAcademicoCommandHandler : IRequestHandler<CrearActualizarPeriodoAcademicoCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CrearPeriodoAcademicoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CrearActualizarPeriodoAcademicoCommand request, CancellationToken cancellationToken)
    {
        var dbEntity = await _context.PeriodoAcademicos
            .Where(x => x.Id == request.Id)
            .FirstOrDefaultAsync(cancellationToken);

        if (dbEntity is not null)
        {
            dbEntity.Periodo = request.Periodo;
            dbEntity.Gestion = request.Gestion;
            dbEntity.FechaInicio = request.FechaInicio!.Value;
            dbEntity.FechaFin = request.FechaFin!.Value;
        }
        else
        {
            dbEntity = new PeriodoAcademico
            {
                Periodo = request.Periodo,
                Gestion = request.Gestion,
                FechaInicio = request.FechaInicio!.Value,
                FechaFin = request.FechaFin!.Value,
            };

            _context.PeriodoAcademicos.Add(dbEntity);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return dbEntity.Id;
    }
}
