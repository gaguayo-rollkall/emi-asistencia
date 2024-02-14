using Microsoft.Extensions.DependencyInjection.Cursos.Commands.BorrarCurso;
using Microsoft.Extensions.DependencyInjection.Cursos.Commands.CrearCurso;
using Microsoft.Extensions.DependencyInjection.Cursos.Queries.GetCursos;

namespace WebApi.Web.Endpoints;

public class Cursos : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetCursos)
            .MapGet(GetCurso, "{cursoId}")
            .MapPost(CrearActualizarCurso)
            .MapDelete(BorrarCurso, "{id}");
    }

    public async Task<IList<CursoDto>> GetCursos(ISender sender, Guid carreraId, Guid periodoId) =>
        await sender.Send(new GetCursosQuery(carreraId, periodoId));

    public async Task<CursoDto?> GetCurso(ISender sender, Guid cursoId) =>
        await sender.Send(new GetCursoQuery(cursoId));
    
    public async Task<Guid> CrearActualizarCurso(ISender sender, CrearCursoCommand command) =>
        await sender.Send(command);

    public async Task<IResult> BorrarCurso(ISender sender, Guid id)
    {
        await sender.Send(new BorrarCursoCommand(id));
        return Results.NoContent();
    }
}
