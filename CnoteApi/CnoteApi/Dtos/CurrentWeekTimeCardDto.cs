namespace CnoteApi.Dtos
{
    public class CurrentWeekTimeCardDto
    {
        public int UserId { get; set; }
        public int ProjectId { get; set; }
        public int SunMins { get; set; }
        public int MonMins { get; set; }
        public int TueMins { get; set; }
        public int WedMins { get; set; }
        public int ThuMins { get; set; }
        public int FriMins { get; set; }
        public int SatMins { get; set; }
        
    }
}
