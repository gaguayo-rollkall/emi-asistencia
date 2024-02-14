namespace Microsoft.Extensions.DependencyInjection.Eventos.Queries;

public class EventoDto
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public DateTime? StartTime { get; set; }
    public DateTime? EndTime { get; set; }
    public bool IsAllDay { get; set; }
    public string Subject { get; set; } = default!;
    public string? Location { get; set; }
    public string? RecurrenceRule { get; set; }
}
