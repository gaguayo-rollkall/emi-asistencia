using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Asistencias.Commands;

public class RegistrarAsistenciaValidator : AbstractValidator<RegistrarAsistenciaCommand>
{
    private readonly IApplicationDbContext _context;

    public RegistrarAsistenciaValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(x => x)
            .CustomAsync(async (model, validationContext, builder) =>
            {
                var evento = await _context.EventosCalendario
                    .AsNoTracking()
                    .SingleOrDefaultAsync(e => e.Id == model.EventoId);

                if (evento is null)
                {
                    return;
                }
                
                if (evento.StartTime > DateTime.Now || evento.EndTime < DateTime.Now)
                {
                    validationContext.AddFailure("No se puede registrar asistencia a un evento que no está en curso.");
                    return;
                }
            });
    }
}
