using Microsoft.Extensions.DependencyInjection.Estudiantes.Commands;
using Microsoft.Extensions.DependencyInjection.Estudiantes.Queries;

namespace WebApi.Web.Endpoints;

public class Estudiantes : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetEstudiantes)
            .MapPost(RegistrarEstudiantes);
    }
    
    public async Task<IList<EstudianteDto>> GetEstudiantes(ISender sender, Guid? cursoId) =>
        await sender.Send(new GetEstudiantesQuery(cursoId));

    public async Task<bool> RegistrarEstudiantes(ISender sender, RegistrarEstudiantesCommand command) =>
        await sender.Send(command);
}
