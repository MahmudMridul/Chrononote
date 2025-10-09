namespace CnoteApi.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; } = null!;
        public string Email { get; set; } = null!;
        public string PasswordHash { get; set; } = null!;
        public DateTime CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
        public bool IsActive { get; set; }
        public ICollection<Project> Projects { get; set; } = new List<Project>();
        public ICollection<TimeCard> TimeCards { get; set; } = new List<TimeCard>();

    }
}
