using CnoteApi.Models;

namespace CnoteApi.Repositories
{
    public interface ITimeCardRepository
    {
        public Task<IEnumerable<TimeCard>> GetCurrentWeekTimeCard();
        public Task<TimeCard> AddTimeCard(TimeCard timeCard);
    }
}
