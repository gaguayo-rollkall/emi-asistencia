namespace Microsoft.Extensions.DependencyInjection.Asistencias.Queries;

public class AsistenciaDto
{
    public DateTime Fecha { get; set; }
    public string RFID { get; set; } = string.Empty;
    public string? CodigoEstudiante { get; set; }
}
