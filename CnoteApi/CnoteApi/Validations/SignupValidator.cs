using CnoteApi.Dtos;
using System.Text.RegularExpressions;

namespace CnoteApi.Validations
{
    public static class SignupValidator
    {
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
            if (string.IsNullOrWhiteSpace(username)) return false;
            if (username.Contains(' ')) return false;
            return true;
        }

        private static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email)) return false;
            string emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            return Regex.IsMatch(email, emailPattern);
        }

        private static bool IsValidPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password)) return false;

            // Password must be at least 8 characters long
            if (password.Length < 8) return false;

            // Must contain at least one uppercase letter
            if (!password.Any(char.IsUpper)) return false;

            // Must contain at least one lowercase letter
            if (!password.Any(char.IsLower)) return false;

            // Must contain at least one digit
            if (!password.Any(char.IsDigit)) return false;

            // Must contain at least one special character
            string specialChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";
            if (!password.Any(c => specialChars.Contains(c))) return false;

            return true;
        }
    }
}
