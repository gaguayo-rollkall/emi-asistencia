﻿namespace Microsoft.Extensions.DependencyInjection.Asistencias.Queries;

public class RegistroAsistenciaDto
{
    public int Id { get; set; }
    public string? Subject { get; set; }
    public string? Nombre { get; set; }
    public string? Codigo { get; set; }
    public string? RFID { get; set; }
    public string Grado { get; set; } = "EST";
    public string? Foto { get; set; }
    public bool Warning { get; set; }
}
