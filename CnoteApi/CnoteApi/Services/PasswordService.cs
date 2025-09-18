namespace CnoteApi.Services
{
    public static class PasswordService
    {
        private static int workFactor = 12;
        public static string HashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password, workFactor);
        }
    }
}
