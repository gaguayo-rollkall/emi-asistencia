namespace WebApi.Domain.Entities;

public class CarreraPeriodo : BaseAuditableEntity
{
    public Guid CarreraId { get; set; }
    public Guid PeriodoAcademicoId { get; set; }
    
    public Carrera? Carrera { get; set; }
    public PeriodoAcademico? PeriodoAcademico { get; set; }
}
