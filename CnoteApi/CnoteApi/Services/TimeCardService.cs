using CnoteApi.Dtos;
using CnoteApi.Models;

namespace CnoteApi.Services
{
    public class TimeCardService
    {
        public static DateTime[] GetStartAndEndOfWeek()
        {
            DateTime today = DateTime.UtcNow.Date;
            DateTime startOfWeek = today.AddDays(-(int)today.DayOfWeek);
            DateTime endOfWeek = startOfWeek.AddDays(6);
            return new DateTime[] { startOfWeek, endOfWeek };
        }

        public static IList<CurrentWeekTimeCardDto> ConvertToTableFormat(IList<TimeCard> timeCards)
        {
            timeCards.OrderBy(tc => tc.ProjectId);
            IList<CurrentWeekTimeCardDto> tableFormat = new List<CurrentWeekTimeCardDto>();
            CurrentWeekTimeCardDto firstItem = ToCurrentWeekTimeCardDto(timeCards[0]);
            SetDayOfWeek(firstItem, timeCards[0]);
            tableFormat.Add(firstItem);
            CurrentWeekTimeCardDto current = firstItem;

            for (int i = 1; i < timeCards.Count(); ++i)
            {
                TimeCard tc = timeCards[i];
                if (tc.ProjectId == timeCards[i - 1].ProjectId)
                {
                    SetDayOfWeek(current, tc);
                }
                else
                {
                    CurrentWeekTimeCardDto item = ToCurrentWeekTimeCardDto(timeCards[i]);
                    SetDayOfWeek(item, timeCards[i]);
                    tableFormat.Add(item);
                    current = item;
                }
            }
            return tableFormat;
        }

        private static CurrentWeekTimeCardDto ToCurrentWeekTimeCardDto(TimeCard timeCard)
        {
            CurrentWeekTimeCardDto dto = new CurrentWeekTimeCardDto();
            dto.ProjectId = timeCard.ProjectId;
            dto.UserId = timeCard.UserId;
            return dto;
        }

        private static void SetDayOfWeek(CurrentWeekTimeCardDto dto, TimeCard timeCard)
        {
            if (timeCard.DayOfWeek == "Sunday") dto.SunMins = timeCard.DurationInMins;
            else if (timeCard.DayOfWeek == "Monday") dto.MonMins = timeCard.DurationInMins;
            else if (timeCard.DayOfWeek == "Tuesday") dto.TueMins = timeCard.DurationInMins;
            else if (timeCard.DayOfWeek == "Wednesday") dto.WedMins = timeCard.DurationInMins;
            else if (timeCard.DayOfWeek == "Thursday") dto.ThuMins = timeCard.DurationInMins;
            else if (timeCard.DayOfWeek == "Friday") dto.FriMins = timeCard.DurationInMins;
            else if (timeCard.DayOfWeek == "Saturday") dto.SatMins = timeCard.DurationInMins;
        }
    }
}
