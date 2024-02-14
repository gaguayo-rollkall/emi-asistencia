namespace Microsoft.Extensions.DependencyInjection.Cursos.Queries.GetCursos;

public class CursoDto
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = default!;
    public string? Carrera { get; set; }
    public int? Gestion { get; set; }
    public string? Periodo { get; set; }
}
