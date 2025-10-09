namespace CnoteApi.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public int UserId { get; set; }
        public User User { get; set; } = null!;
        public ICollection<TimeCard> TimeCards { get; set; } = new List<TimeCard>();
    }
}
