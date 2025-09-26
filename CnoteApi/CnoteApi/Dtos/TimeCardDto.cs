namespace CnoteApi.Dtos
{
    public class TimeCardDto
    {
        public int DurationInMins { get; set; }
        public DateTime Date { get; set; }
        public string DayOfWeek { get; set; } = null!;
        public int ProjectId { get; set; }
    }
}
