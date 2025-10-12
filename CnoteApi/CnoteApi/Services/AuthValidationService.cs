using CnoteApi.Dtos;
using CnoteApi.Models;
using CnoteApi.Repositories.IRepositories;
using System.Text.RegularExpressions;

namespace CnoteApi.Services
{
    public class AuthValidationService
    {
        public const int MIN_USERNAME_LENGTH = 4;
        public const int MAX_USERNAME_LENGTH = 50;
        public const int MAX_EMAIL_LENGTH = 100;
        public const int MIN_PASS_LENGTH = 8;
        public const int MAX_PASS_LENGTH = 30;

        private readonly IUserRepository _userRepo;

        public AuthValidationService(IUserRepository userRepo)
        {
            _userRepo = userRepo;
        }

        public async Task<ValidationResult> IsValidSignupDto(SignupDto? signupDto)
        {
            bool isValidDto =
                signupDto is not null &&
                IsValidUsername(signupDto.Username) &&
                IsValidEmail(signupDto.Email) &&
                IsValidPassword(signupDto.Password);

            
            if (!isValidDto) 
            {
                return ValidationResult.Create("Invalid username, email or password");
            }

            bool emailOrUsernameExists = 
                await _userRepo.UsernameExists(signupDto.Username) ||
                await _userRepo.EmailExists(signupDto.Email);

            if (emailOrUsernameExists)
            {
                return ValidationResult.Create("Username or email already exists");
            }

            return ValidationResult.Create("Valid data", true);
        }

        public async Task<ValidationResult> IsValidSigninDto(SigninDto? signinDto)
        {
            bool isValidDto = 
                signinDto is not null &&
                IsValidUsername(signinDto.Username) &&
                IsValidPassword(signinDto.Password);

            if (!isValidDto)
            {
                return ValidationResult.Create("Invalid username or password");
            }

            User? user = await _userRepo.GetUserByUsername(signinDto!.Username);

            if (user is null)
            {
                return ValidationResult.Create("User is not registered. Sign up first");
            }

            bool isPasswordCorrect = PasswordService.VerifyPassword(signinDto.Password, user.PasswordHash);

            if (!isPasswordCorrect)
            {
                return ValidationResult.Create("Incorrect password");
            }

            return ValidationResult.Create("Valid data", true, user);
        }

        private bool IsValidUsername(string username)
        {
            bool isValidUsername = 
                !string.IsNullOrWhiteSpace(username) && 
                !username.Contains(' ') && 
                username.Length >= MIN_USERNAME_LENGTH && 
                username.Length <= MAX_USERNAME_LENGTH;   
            
            return isValidUsername;
        }

        private bool IsValidEmail(string email)
        {
            string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            bool isValidEmail =
                !string.IsNullOrWhiteSpace(email) &&
                Regex.IsMatch(email, emailPattern) &&
                email.Length <= MAX_EMAIL_LENGTH;
            
            return isValidEmail;
        }

        private bool IsValidPassword(string password)
        {
            string specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

            bool isValidPass =
                !string.IsNullOrWhiteSpace(password) &&
                password.Length >= MIN_PASS_LENGTH &&
                password.Length <= MAX_PASS_LENGTH &&
                password.Any(char.IsUpper) &&
                password.Any(char.IsLower) &&
                password.Any(char.IsDigit) &&
                password.Any(c => specialChars.Contains(c));

            return isValidPass;
        }
    }
}
