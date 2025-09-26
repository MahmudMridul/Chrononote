using CnoteApi.Dtos;

namespace CnoteApi.Services
{
    public class TimeCardValidationService
    {
        public static bool IsValidTimeCard(TimeCardDto dto)
        {
            if (dto.DurationInMins <= 0)
            {
                return false;
            }
            return true;            
        }
    }
}
