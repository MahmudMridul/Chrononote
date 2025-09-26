using CnoteApi.Database;
using CnoteApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CnoteApi.Repositories
{
    public class TimeCardRepository : ITimeCardRepository
    {
        private readonly AppDbContext _dbContext;
        public TimeCardRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<TimeCard>> GetCurrentWeekTimeCard()
        {
            DateTime today = DateTime.Today;
            int daysFromMonday = (int)today.DayOfWeek - (int)DayOfWeek.Monday;
            if (daysFromMonday < 0) daysFromMonday += 7; // Handle Sunday case

            var startOfWeek = today.AddDays(-daysFromMonday);
            var endOfWeek = startOfWeek.AddDays(6);

            return await _dbContext.TimeCards
                .AsNoTracking()
                .Include(tc => tc.Project)
                .Where(tc => tc.Date >= startOfWeek && tc.Date <= endOfWeek)
                .OrderBy(tc => tc.Date)
                .ToListAsync();
        }

        public async Task<TimeCard> AddTimeCard(TimeCard timeCard)
        {
            await _dbContext.TimeCards.AddAsync(timeCard);
            await _dbContext.SaveChangesAsync();
            return timeCard;
        }
    }
}
