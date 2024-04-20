namespace WebApi.Application.Reportes.Queries;
public class RegistroMesDto
{
    public RegistroMesDto(string mes, int cantidad)
    {
        Mes = mes;
        Cantidad = cantidad;
    }

    public string Mes { get; set; } = string.Empty;
    public int Cantidad { get; set; }
}
