namespace CnoteApi.Models
{
    public class TimeCard
    {
        public int Id { get; set; }
        public int DurationInMins { get; set; }
        public DateTime Date { get; set; }
        public string DayOfWeek { get; set; } = null!;
        public int ProjectId { get; set; }
        public Project Project { get; set; } = null!;
    }
}
