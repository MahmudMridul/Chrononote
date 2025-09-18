using CnoteApi.Dtos;
using CnoteApi.Models;
using CnoteApi.Repositories;
using CnoteApi.Services;
using Microsoft.AspNetCore.Mvc;


namespace CnoteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly SignupValidationService _signupValidationService;
        private readonly IUserRepository _userRepo;
        public AuthController(SignupValidationService signupValidationService, IUserRepository userRepo)
        {
            _signupValidationService = signupValidationService;
            _userRepo = userRepo;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<ApiResponse>> Signup([FromBody] SignupDto? signupDto)
        {
            ValidationResult result = await _signupValidationService.IsValidSignupDto(signupDto);
            if (!result.IsValid)
            {
                ApiResponse res = ApiResponse.BadRequest(msg: result.Message);
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

            await _userRepo.AddAsync(newUser);

            ApiResponse response = ApiResponse.Created(msg: "Signup successfull");
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
