using CnoteApi.Dtos;

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

        public static TimeCard DtoToTimeCard(TimeCardDto dto)
        {
            return new TimeCard
            {
                DurationInMins = dto.DurationInMins,
                Date = dto.Date,
                DayOfWeek = dto.DayOfWeek,
                ProjectId = dto.ProjectId,
            };
        }
    }
}
