
using CnoteApi.Services;

namespace CnoteApi.Tests
{
    public class TimeCardServiceTests
    {
        [Fact]
        public void GetStartAndEndOfWeek_ShouldReturnCorrectStartAndEndDates()
        {
            // Act
            DateTime[] result = TimeCardService.GetStartAndEndOfWeek();
            DateTime startOfWeek = result[0];
            DateTime endOfWeek = result[1];

            // Assert
            Assert.Equal(2, result.Length);
            Assert.Equal(DayOfWeek.Sunday, startOfWeek.DayOfWeek);
            Assert.Equal(DayOfWeek.Saturday, endOfWeek.DayOfWeek);
            Assert.Equal(6, (endOfWeek - startOfWeek).Days);
            Assert.True(startOfWeek <= DateTime.UtcNow.Date);
            Assert.True(endOfWeek >= DateTime.UtcNow.Date);
        }
    }
}
