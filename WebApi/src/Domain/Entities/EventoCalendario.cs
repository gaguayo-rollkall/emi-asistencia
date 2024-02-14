using Microsoft.EntityFrameworkCore;

namespace WebApi.Domain.Entities;

public class EventoCalendario
{
    public int Id { get; set; }
    public string? Description { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsAllDay { get; set; }
    public string Subject { get; set; } = default!;
    public string? Location { get; set; }
    public string? RecurrenceRule { get; set; }
    
    public static void Map(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<EventoCalendario>()
            .HasKey(s => s.Id);

        modelBuilder.Entity<EventoCalendario>()
            .Property(x => x.Description)
            .HasMaxLength(200);
        
        modelBuilder.Entity<EventoCalendario>()
            .Property(x => x.Subject)
            .HasMaxLength(120);
        
        modelBuilder.Entity<EventoCalendario>()
            .Property(x => x.Location)
            .HasMaxLength(120);
        
        modelBuilder.Entity<EventoCalendario>()
            .Property(x => x.RecurrenceRule)
            .HasMaxLength(50);
    }
}
