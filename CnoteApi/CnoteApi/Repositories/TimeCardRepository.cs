using CnoteApi.Database;
using CnoteApi.Dtos;
using CnoteApi.Models;
using CnoteApi.Services;
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

        public async Task<IList<CurrentWeekTimeCardDto>> GetCurrentWeekTimeCard(int userId)
        {
            DateTime[] startAndEnd = TimeCardService.GetStartAndEndOfWeek();
            DateTime startOfWeek = startAndEnd[0];
            DateTime endOfWeek = startAndEnd[1];

            IList<TimeCard> timeCards = await _dbContext.TimeCards
                .AsNoTracking()
                .Where(tc => tc.Date >= startOfWeek && tc.Date <= endOfWeek && tc.UserId == userId)
                .ToListAsync();
            
            if (timeCards.Count == 0) return new List<CurrentWeekTimeCardDto>();

            return TimeCardService.ConvertToTableFormat(timeCards);
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
