namespace CnoteApi.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; } = null!;
        public ICollection<TimeCard> TimeCards { get; set; } = new List<TimeCard>();
    }
}
