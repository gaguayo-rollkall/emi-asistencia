using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearPeriodoAcademico;

public class CrearPeriodoAcademicoCommand : IRequest<Guid>
{
    public string Periodo { get; set; } = default!;
    public int Gestion { get; set; }
    public DateTime? FechaInicio { get; set; }
    public DateTime? FechaFin { get; set; }
}

public class CrearPeriodoAcademicoCommandHandler : IRequestHandler<CrearPeriodoAcademicoCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CrearPeriodoAcademicoCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CrearPeriodoAcademicoCommand request, CancellationToken cancellationToken)
    {
        var entity = new PeriodoAcademico
        {
            Periodo = request.Periodo,
            Gestion = request.Gestion,
            FechaInicio = request.FechaInicio!.Value,
            FechaFin = request.FechaFin!.Value,
        };

        _context.PeriodoAcademicos.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
