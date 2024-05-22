using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Licencias.Commands;

public class RegistrarLicenciaValidator : AbstractValidator<RegistrarLicenciasCommand>
{
    private readonly IApplicationDbContext _context;

    public RegistrarLicenciaValidator(IApplicationDbContext context)
    {
        _context = context;
        
        RuleFor(x => x)
            .CustomAsync(async (model, validationContext, builder) =>
            {
                var failures = new List<string>();
                
                if (string.IsNullOrEmpty(model.CodigoEstudiante))
                {
                    failures.Add("Codigo de Estudiante no debe ser vacio.");
                }

                if (string.IsNullOrEmpty(model.Titulo))
                {
                    failures.Add("Titulo no debe ser vacio.");
                }

                if (string.IsNullOrEmpty(model.Justificacion))
                {
                    failures.Add("Justificacion no debe ser vacio.");
                }

                if (model.Fecha == DateTime.MinValue)
                {
                    failures.Add("Fecha no debe ser vacio.");
                }
                
                if (failures.Any())
                {
                    failures.ForEach(validationContext.AddFailure);
                    return;
                }
                
                var estudiante = await _context.Estudiantes
                    .AsNoTracking()
                    .AnyAsync(e => e.Codigo == model.CodigoEstudiante);

                if (!estudiante)
                {
                    validationContext.AddFailure($"Estudiante con codigo {model.CodigoEstudiante} no se encuentra registrado.");
                }
            });
    }
}
