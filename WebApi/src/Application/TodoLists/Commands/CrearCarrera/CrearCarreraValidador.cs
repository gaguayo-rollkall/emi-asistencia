using WebApi.Application.Common.Interfaces;

namespace Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearCarrera;

public class CrearCarreraValidador : AbstractValidator<CrearCarreraCommand>
{
    private readonly IApplicationDbContext _context;

    public CrearCarreraValidador(IApplicationDbContext context)
    {
        _context = context;
        
        RuleFor(v => v.Nombre)
            .NotEmpty()
            .MaximumLength(200)
            .MustAsync(async (nombre, cancellationToken) =>
            {
                return await _context.Carreras.AllAsync(c => c.Nombre != nombre, cancellationToken);
            })
            .WithMessage("'{PropertyName}' debe ser unico.")
            .WithErrorCode("Unique");
    }
}
