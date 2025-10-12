using CnoteApi.Dtos;
using CnoteApi.Models;

namespace CnoteApi.Repositories.IRepositories
{
    public interface ITimeCardRepository
    {
        public Task<IList<CurrentWeekTimeCardDto>> GetCurrentWeekTimeCard(int userId);
        public Task<TimeCard> AddTimeCard(TimeCard timeCard);
    }
}
