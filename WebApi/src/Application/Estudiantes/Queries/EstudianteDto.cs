namespace Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;

public class EstudianteDto
{
    public Guid? Id { get; set; }
    public Guid? CursoId { get; set; }
    public string Grado { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string Codigo { get; set; } = string.Empty;
    public string RFID { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Foto { get; set; }
}
