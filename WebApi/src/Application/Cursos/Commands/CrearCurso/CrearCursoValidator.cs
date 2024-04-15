using WebApi.Application.Common.Interfaces;
using WebApi.Domain.Entities;

namespace Microsoft.Extensions.DependencyInjection.Cursos.Commands.CrearCurso;

public class CrearCursoValidator : AbstractValidator<CrearCursoCommand>
{
    private readonly IApplicationDbContext _context;

    public CrearCursoValidator(IApplicationDbContext context)
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
                
                if (failures.Any())
                {
                    failures.ForEach(validationContext.AddFailure);
                    return;
                }

                var curso = await _context.Cursos
                    .AsNoTracking()
                    .AnyAsync(e => e.Id != model.Id &&
                                   e.CarreraId == model.CarreraId &&
                                   e.PeriodoAcademicoId == model.PeriodoId &&
                                   e.Nombre == model.Nombre);

                var carrera = await _context.Carreras.SingleAsync(c => c.Id == model.CarreraId);
                var periodo = await _context.PeriodoAcademicos.SingleAsync(x => x.Id == model.PeriodoId);

                if (curso)
                {
                    validationContext.AddFailure($"Curso con nombre '{model.Nombre}' ya se encuentra registrado en '{carrera.Nombre} - {periodo.Gestion}/{periodo.Periodo}'.");
                }
            });
    }
}
