namespace Microsoft.Extensions.DependencyInjection.TodoLists.Queries.PeriodosAcademicos;

public class PeriodoDTO
{
    public Guid Id { get; set; }
    public int Gestion { get; set; }
    public DateTime FechaInicio { get; set; }
    public DateTime FechaFin { get; set; }
    public string Periodo { get; set; } = string.Empty;
}

public class PeriodoAcademicoDTO
{
    public int Gestion { get; set; }
    public IList<PeriodoDTO> Periodos { get; set; } = new List<PeriodoDTO>();
}
