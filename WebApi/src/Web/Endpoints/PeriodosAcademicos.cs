using Microsoft.Extensions.DependencyInjection.TodoLists.Commands.BorrarPeriodoAcademico;
using Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearPeriodoAcademico;
using Microsoft.Extensions.DependencyInjection.TodoLists.Queries.PeriodosAcademicos;

namespace WebApi.Web.Endpoints;

public class PeriodosAcademicos : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetPeriodosAcademicos)
            .MapPost(CrearActualizarPeriodoAcademico)
            .MapDelete(BorrarPeriodoAcademico, "{id}");
    }

    public async Task<IList<PeriodoAcademicoDTO>> GetPeriodosAcademicos(ISender sender)
        => await sender.Send(new GetPeriodosAcademicosQuery());
    
    public async Task<Guid> CrearActualizarPeriodoAcademico(ISender sender, CrearActualizarPeriodoAcademicoCommand command)
        => await sender.Send(command);

    public async Task<IResult> BorrarPeriodoAcademico(ISender sender, Guid id)
    {
        await sender.Send(new BorrarPeriodoAcademicoCommand(id));
        return Results.NoContent();
    }
}
