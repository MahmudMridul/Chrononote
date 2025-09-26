using CnoteApi.Dtos;
using CnoteApi.Models;
using CnoteApi.Repositories;
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

        [HttpGet]
        public async Task<ActionResult<ApiResponse>> GetCurrentWeekTimeCard()
        {
            IEnumerable<TimeCard> currentWeekTimeCards = await _timeCardRepo.GetCurrentWeekTimeCard();
            ApiResponse response = ApiResponse.Ok(data: currentWeekTimeCards, msg: "Success");
            return Ok(response);
        }

        public async Task<ActionResult<ApiResponse>> AddTimeCard([FromBody] TimeCardDto tcDto)
        {
            if (!TimeCardValidationService.IsValidTimeCard(tcDto))
            {
                ApiResponse res = ApiResponse.BadRequest(msg: "Invalid time card");
                return BadRequest(res);
            }
            TimeCard newTimeCard = TimeCard.DtoToTimeCard(tcDto);
            await _timeCardRepo.AddTimeCard(newTimeCard);
            ApiResponse resp = ApiResponse.Ok(data: newTimeCard, msg: "Time card created");
            return Ok(resp);
        }


        // GET api/<TimeCardController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<TimeCardController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<TimeCardController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<TimeCardController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
