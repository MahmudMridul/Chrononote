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
        private readonly IConfiguration _config;

        private readonly AuthValidationService _authValidationService;
        private readonly TokenService _tokenService;

        private readonly IUserRepository _userRepo;
        private readonly IRefreshTokenRepository _refreshTokenRepo;
        public AuthController(IConfiguration config, AuthValidationService authValidationService, TokenService tokenService, IUserRepository userRepo, IRefreshTokenRepository refreshTokenRepo)
        {
            _config = config;

            _authValidationService = authValidationService;
            _tokenService = tokenService;

            _userRepo = userRepo;
            _refreshTokenRepo = refreshTokenRepo;
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

            User user = (User)result.Data!;

            string accessToken = _tokenService.GenerateAccessToken(user);
            string refreshToken = _tokenService.GenerateRefreshToken();

            await _refreshTokenRepo.RemoveByUserId(user.Id);

            RefreshToken newRefreshToken = new RefreshToken
            {
                Token = refreshToken,
                UserId = user.Id,
                Expires = DateTime.UtcNow.AddDays(int.Parse(_config["RefreshTokenExpirationDays"]!)),
                Created = DateTime.UtcNow
            };

            await _refreshTokenRepo.AddAsync(newRefreshToken);

            HttpContext.Response.Cookies.Append("refreshToken", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTime.UtcNow.AddDays(int.Parse(_config["RefreshTokenExpirationDays"]!)),
                SameSite = SameSiteMode.Lax,
                Secure = true
            });

            SigninResponseDto signinResponseDto = new SigninResponseDto
            {
                UserId = user.Id,
                Username = user.Username,
                Email = user.Email,
                AccessToken = accessToken,
                RefreshToken = refreshToken,
                AccessTokenExpiresAt = DateTime.UtcNow.AddMinutes(int.Parse(_config["JwtSettings:AccessTokenExpirationMinutes"]!)),
                RefreshTokenExpiresAt = newRefreshToken.Expires
            };

            ApiResponse res = ApiResponse.Ok(data: signinResponseDto, msg: "Signin successfull");
            return Ok(res);
        }
    }
}
