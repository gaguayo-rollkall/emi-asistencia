namespace Microsoft.Extensions.DependencyInjection.Reportes.Queries;

public class RegistroCarreraDto
{
    public Guid IdCarrera { get; set; }
    public string Carrera { get; set; } = string.Empty;
    public List<RegistroCurso> Cursos { get; set; } = new();
}

public class RegistroCurso
{
    public Guid Id { get; set; }
    public string Nombre { get; set; } = string.Empty;
    public List<RegistroEstudiante> Estudiantes { get; set; } = new();
}

public class RegistroEstudiante
{
    public string Codigo { get; set; } = string.Empty;
    public string Nombre { get; set; } = string.Empty;
    public string? Ingreso { get; set; }
    public string? Salida { get; set; }
    public int? Registros { get; set; }
    public string Fecha { get; internal set; } = string.Empty;
    public bool Atraso { get; internal set; }
    public string Observacion { get; set; } = "Sin Registro";
}
