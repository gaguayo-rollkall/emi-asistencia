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
                    var start = ((DateTime)evento.StartTime!).ToString("hh:mm tt");
                    var end = ((DateTime)evento.EndTime!).ToString("hh:mm tt");
                    var day = ((DateTime)evento.StartTime!).ToString("dd/MM/yyyy");
                    validationContext.AddFailure($"Asistencia '{evento.Subject}' esta fuera de horario, solo se permite entre '{start}' y '{end}' del '{day}'.");
                    return;
                }
            });
    }
}
