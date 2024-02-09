using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.ActualizarCarrera;

public class ActualizarCarreraValidador : AbstractValidator<ActualizarCarreraCommand>
{
    private readonly IApplicationDbContext _context;

    public ActualizarCarreraValidador(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(v => v.Nombre)
            .NotEmpty()
            .MaximumLength(200)
            .MustAsync(async (model, nombre, cancellationToken) =>
            {
                return await _context.Carreras
                    .Where(l => l.Id != model.Id)
                    .AllAsync(l => l.Nombre != nombre, cancellationToken);
            })
            .WithMessage("'{PropertyName}' debe ser unico.")
            .WithErrorCode("Unique");
    }
}
