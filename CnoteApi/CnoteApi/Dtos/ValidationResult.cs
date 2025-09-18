namespace CnoteApi.Dtos
{
    public class ValidationResult
    {
        public string Message { get; set; } = string.Empty;
        public bool IsValid { get; set; } = false;

        public static ValidationResult Create(string msg, bool isValid = false)
        {
            return new ValidationResult
            {
                Message = msg,
                IsValid = isValid
            };
        }
    }
}
