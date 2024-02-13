using Microsoft.Extensions.DependencyInjection.TodoLists.Commands.CrearPeriodoAcademico;
using Microsoft.Extensions.DependencyInjection.TodoLists.Queries.PeriodosAcademicos;

namespace WebApi.Web.Endpoints;

public class PeriodosAcademicos : EndpointGroupBase
{
    public override void Map(WebApplication app)
    {
        app.MapGroup(this)
            .MapGet(GetPeriodosAcademicos)
            .MapPost(CrearPeriodoAcademico);
    }

    public async Task<IList<PeriodoAcademicoDTO>> GetPeriodosAcademicos(ISender sender)
        => await sender.Send(new GetPeriodosAcademicosQuery());
    
    public async Task<Guid> CrearPeriodoAcademico(ISender sender, CrearPeriodoAcademicoCommand command)
        => await sender.Send(command);
}
