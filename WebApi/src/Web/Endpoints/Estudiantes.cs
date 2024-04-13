using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.DependencyInjection.Estudiantes.Commands;
using Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;

namespace WebApi.Web.Endpoints;

public class Estudiantes : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetEstudiantes)
            .MapGet(GetEstudiante, "/{codigo}")
            .MapPost(RegistrarEstudiantes)
            .MapPost(EnviarInvitacion, "/enviar-invitacion")
            .MapMethods("/registrar-estudiante", new[] { "POST" }, RegistrarEstudiante);
    }
    
    public async Task<IList<EstudianteDto>> GetEstudiantes(ISender sender, Guid? cursoId) =>
        await sender.Send(new GetEstudiantesQuery(cursoId));
    
    [AllowAnonymous]
    public async Task<EstudianteDto?> GetEstudiante(ISender sender, string? codigo) =>
        await sender.Send(new GetEstudianteQuery(codigo));

    public async Task<bool> RegistrarEstudiantes(ISender sender, RegistrarEstudiantesCommand command) =>
        await sender.Send(command);
    
    public async Task<bool> RegistrarEstudiante(ISender sender, RegistrarEstudianteCommand command) =>
        await sender.Send(command);

    public async Task<bool> EnviarInvitacion(ISender sender, EnviarInvitacionCommand command) =>
        await sender.Send(command);
}
