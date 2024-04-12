using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.Usuarios.Commands;

public class ActualizarInformacionUsuarioCommandValidator : AbstractValidator<ActualizarInformacionUsuarioCommand>
{
    private readonly IApplicationDbContext _context;

    public ActualizarInformacionUsuarioCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(x => x.Nombre)
            .NotEmpty();

        RuleFor(x => x.UserId)
            .NotEmpty();
        
        RuleFor(x => x)
            .CustomAsync(async (model, validationContext, builder) =>
            {
                var usuario = await _context.UsuarioInformaciones
                    .AsNoTracking()
                    .SingleOrDefaultAsync(e => e.Id != model.Id && e.UserId == model.UserId);

                if (usuario is not null)
                {
                    validationContext.AddFailure("El email ya está en uso.");
                }
            });
    }
}
