using CnoteApi.Dtos;
using System.Text.RegularExpressions;

namespace CnoteApi.Validations
{
    public static class SignupValidator
    {
        public const int MIN_USERNAME_LENGTH = 4;
        public const int MAX_USERNAME_LENGTH = 50;
        public const int MAX_EMAIL_LENGTH = 100;
        public const int MIN_PASS_LENGTH = 8;
        public const int MAX_PASS_LENGTH = 30;
        public static bool IsValidSignupDto(SignupDto signupDto)
        {
            if (signupDto is null) return false;
            if (!IsValidUsername(signupDto.Username)) return false;
            if (!IsValidEmail(signupDto.Email)) return false;
            if (!IsValidPassword(signupDto.Password)) return false;
            return true;
        }

        private static bool IsValidUsername(string username)
        {
            bool isValidUsername = 
                !string.IsNullOrWhiteSpace(username) && 
                !username.Contains(' ') && 
                username.Length >= MIN_USERNAME_LENGTH && 
                username.Length <= MAX_USERNAME_LENGTH;   
            
            return isValidUsername;
        }

        private static bool IsValidEmail(string email)
        {
            string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";

            bool isValidEmail =
                !string.IsNullOrWhiteSpace(email) &&
                Regex.IsMatch(email, emailPattern) &&
                email.Length <= MAX_EMAIL_LENGTH;
            
            return isValidEmail;
        }

        private static bool IsValidPassword(string password)
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
