using CnoteApi.Dtos;
using CnoteApi.Models;
using CnoteApi.Repositories.IRepositories;
using CnoteApi.Services;
using Microsoft.AspNetCore.Mvc;

namespace CnoteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TimeCardController : ControllerBase
    {
        private readonly ITimeCardRepository _timeCardRepo;
        public TimeCardController(ITimeCardRepository timeCardRepo)
        {
            _timeCardRepo = timeCardRepo;
        }

        [HttpPost("currentweek")]
        public async Task<ActionResult<ApiResponse>> GetCurrentWeekTimeCard([FromBody] int userId)
        {
            IList<CurrentWeekTimeCardDto> currentWeekTimeCards = await _timeCardRepo.GetCurrentWeekTimeCard(userId);
            ApiResponse response = ApiResponse.Ok(data: currentWeekTimeCards, msg: "Success");
            return Ok(response);
        }

        [HttpPost("add")]
        public async Task<ActionResult<ApiResponse>> Add([FromBody] TimeCardDto tcDto)
        {
            if (!TimeCardValidationService.IsValidTimeCard(tcDto))
            {
                ApiResponse res = ApiResponse.BadRequest(msg: "Invalid time card");
                return BadRequest(res);
            }
            TimeCard newTimeCard = TimeCard.DtoToTimeCard(tcDto);
            await _timeCardRepo.AddTimeCard(newTimeCard);
            ApiResponse resp = ApiResponse.Created(data: newTimeCard, msg: "Time card created");
            return Created("", resp);
        }
    }
}
