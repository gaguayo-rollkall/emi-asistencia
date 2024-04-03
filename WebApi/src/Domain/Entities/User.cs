namespace WebApi.Domain.Entities;

public class User
{
    public string? Email { get; set; }
    public string? UserName { get; set; }
    public string Id { get; set; } = string.Empty;
    public string? Nombre { get; set; }
}
