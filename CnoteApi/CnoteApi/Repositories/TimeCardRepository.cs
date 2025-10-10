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

        public async Task<IEnumerable<TimeCard>> GetCurrentWeekTimeCard(int userId)
        {
            DateTime today = DateTime.UtcNow.Date;
            int daysFromMonday = (int)today.DayOfWeek - (int)DayOfWeek.Monday;
            if (daysFromMonday < 0) daysFromMonday += 7; // Handle Sunday case

            var startOfWeek = today.AddDays(-daysFromMonday);
            var endOfWeek = startOfWeek.AddDays(6);

            return await _dbContext.TimeCards
                .AsNoTracking()
                .Where(tc => tc.Date >= startOfWeek && tc.Date <= endOfWeek && tc.UserId == userId)
                .OrderBy(tc => tc.Date)
                .ToListAsync();
        }

        public async Task<TimeCard> AddTimeCard(TimeCard timeCard)
        {
            TimeCard? existingTimeCard = await _dbContext.TimeCards
                .FirstOrDefaultAsync(tc => tc.Date == timeCard.Date && tc.UserId == timeCard.UserId && tc.ProjectId == timeCard.ProjectId);

            if (existingTimeCard is null)
            {
                await _dbContext.TimeCards.AddAsync(timeCard);
                
            }
            else
            {
                existingTimeCard.DurationInMins += timeCard.DurationInMins;
                _dbContext.TimeCards.Update(existingTimeCard);
            }
            await _dbContext.SaveChangesAsync();
            return timeCard;
        }
    }
}
