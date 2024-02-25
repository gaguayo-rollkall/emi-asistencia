using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Estudiantes.Commands;

public class RegistrarEstudianteValidador : AbstractValidator<RegistrarEstudianteCommand>
{
    private readonly IApplicationDbContext _context;

    public RegistrarEstudianteValidador(IApplicationDbContext context)
    {
        _context = context;
        
        RuleFor(x => x)
            .CustomAsync(async (model, validationContext, builder) =>
            {
                var failures = new List<string>();
                
                if (string.IsNullOrEmpty(model.Nombre))
                {
                    failures.Add("Nombre no debe ser vacio.");
                }

                if (string.IsNullOrEmpty(model.Codigo))
                {
                    failures.Add("Codigo no debe ser vacio.");
                }

                if (failures.Any())
                {
                    failures.ForEach(validationContext.AddFailure);
                    return;
                }

                if (model.Id is null)
                {
                    var estudiante = await _context.Estudiantes
                        .AsNoTracking()
                        .AnyAsync(e => e.Codigo == model.Codigo);

                    if (estudiante)
                    {
                        validationContext.AddFailure($"Estudiante con codigo {model.Codigo} ya se encuentra registrado.");
                    }
                }

                if (!string.IsNullOrEmpty(model.RFID))
                {
                    var estudianteRfid = await _context.Estudiantes
                        .AsNoTracking()
                        .Where(e => e.RFID == model.RFID)
                        .Select(e => new
                        {
                            e.Id,
                        })
                        .FirstOrDefaultAsync();

                    if (estudianteRfid is not null && estudianteRfid.Id != model.Id)
                    {
                        validationContext.AddFailure($"RFID {model.RFID} ya se encuentra registrado.");
                    }
                }
            });
    }
}
