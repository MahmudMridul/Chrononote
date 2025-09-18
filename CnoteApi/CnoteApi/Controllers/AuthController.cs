using CnoteApi.Dtos;
using CnoteApi.Models;
using CnoteApi.Services;
using CnoteApi.Validations;
using Microsoft.AspNetCore.Mvc;


namespace CnoteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        [HttpPost("signup")]
        public async Task<ActionResult<ApiResponse>> Signup([FromBody] SignupDto signupDto)
        {
            if (!SignupValidator.IsValidSignupDto(signupDto))
            {
                ApiResponse res = ApiResponse.BadRequest(msg: "Valid username, email and password required.");
                return BadRequest(res);
            }

            string hashedPassword = PasswordService.HashPassword(signupDto.Password);

            User newUser = new User
            {
                Username = signupDto.Username,
                Email = signupDto.Email,
                PasswordHash = hashedPassword,
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = null,
                IsActive = true
            };
            ApiResponse response = ApiResponse.Created(data: newUser, msg: "User registration test success");
            return Created("", response);
        }

        // GET: api/<AuthController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<AuthController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<AuthController>
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/<AuthController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<AuthController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
