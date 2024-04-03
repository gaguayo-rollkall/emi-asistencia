namespace Microsoft.Extensions.DependencyInjection.Usuarios.Queries;

public class UsuarioDto
{
    public string Id { get; set; } = default!;
    public string? UserName { get; set; }
    public string? Email { get; set; }
    public string? Nombre { get; set; }
}
