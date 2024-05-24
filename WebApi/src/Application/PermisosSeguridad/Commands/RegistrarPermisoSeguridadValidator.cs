using WebApi.Application.Common.Interfaces;

namespace WebApi.Application.PermisosSeguridad.Commands;

public class RegistrarPermisoSeguridadValidator : AbstractValidator<RegistrarPermisosSeguridadCommand>
{
    private readonly IApplicationDbContext _context;

    public RegistrarPermisoSeguridadValidator(IApplicationDbContext context)
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
                
                if (!model.UsuariosSistema && !model.Reportes && !model.Carreras && !model.PeriodosAcademicos && !model.Cursos && !model.Calendario && !model.Estudiantes && !model.Licencias && !model.Control)
                {
                    failures.Add("Debe seleccionar al menos un permiso.");
                }

                if (failures.Any())
                {
                    failures.ForEach(validationContext.AddFailure);
                    return;
                }

                var permiso = await _context.PermisoSeguridades
                    .AsNoTracking()
                    .FirstOrDefaultAsync(e => e.Nombre == model.Nombre);

                if (permiso is not null && permiso.Id != model.Id)
                {
                    validationContext.AddFailure($"Permiso con nombre {permiso.Nombre} ya se encuentra registrado");
                }
            });
    }
}
