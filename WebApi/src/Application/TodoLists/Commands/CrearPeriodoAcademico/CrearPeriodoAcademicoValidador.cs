using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearPeriodoAcademico;

public class CrearPeriodoAcademicoValidador : AbstractValidator<CrearActualizarPeriodoAcademicoCommand>
{
    private readonly IApplicationDbContext _context;

    public CrearPeriodoAcademicoValidador(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(x => x)
            .CustomAsync(async (model, validationContext, builder) =>
            {
                var failures = new List<string>();
                
                if (string.IsNullOrEmpty(model.Periodo))
                {
                    failures.Add("Periodo no debe ser vacio.");
                }

                if (model.Gestion < 1990)
                {
                    failures.Add("Gestion debe ser mayor a 1990");
                }

                if (model.FechaInicio is null)
                {
                    failures.Add("Fecha de Inicio es obligatoria.");
                }
                
                if (model.FechaFin is null)
                {
                    failures.Add("Fecha de Fin es obligatoria.");
                }

                if (model.FechaFin < model.FechaInicio)
                {
                    failures.Add("Fecha de Fin debe ser mayor a Fecha de Inicio.");
                }

                if (failures.Any())
                {
                    failures.ForEach(validationContext.AddFailure);
                    return;
                }
                
                var periodoGestion = await _context.PeriodoAcademicos
                    .AsNoTracking()
                    .AnyAsync(p => p.Gestion == model.Gestion && p.Periodo == model.Periodo);

                if (periodoGestion)
                {
                    validationContext.AddFailure($"{model.Gestion} - ${model.Periodo} ya se encuentra registrado.");
                }
            });
    }
}
