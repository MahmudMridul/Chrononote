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
        private readonly AuthValidationService _authValidationService;
        private readonly IUserRepository _userRepo;
        public AuthController(AuthValidationService authValidationService, IUserRepository userRepo)
        {
            _authValidationService = authValidationService;
            _userRepo = userRepo;
        }

        [HttpPost("signup")]
        public async Task<ActionResult<ApiResponse>> Signup([FromBody] SignupDto? signupDto)
        {
            ValidationResult result = await _authValidationService.IsValidSignupDto(signupDto);
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

        [HttpPost("signin")]
        public async Task<ActionResult<ApiResponse>> Signin([FromBody] SigninDto signinDto)
        {
            ValidationResult result = await _authValidationService.IsValidSigninDto(signinDto);
            if (!result.IsValid)
            {
                ApiResponse resp = ApiResponse.UnAuthorized(msg: result.Message);
                return Unauthorized(resp);
            }

            ApiResponse res = ApiResponse.Ok(msg: "Signin successfull");
            return Ok(res);
        }
    }
}
