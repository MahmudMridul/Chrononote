namespace CnoteApi.Dtos
{
    public class ValidationResult
    {
        public string Message { get; set; } = string.Empty;
        public bool IsValid { get; set; } = false;
        public object? Data { get; set; } = null;

        public static ValidationResult Create(string msg, bool isValid = false, object? data = null)
        {
            return new ValidationResult
            {
                Message = msg,
                IsValid = isValid,
                Data = data
            };
        }
    }
}
