using System.Net;

namespace CnoteApi.Dtos
{
    public class ApiResponse
    {
        public object? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool Success { get; set; }
        public HttpStatusCode StatusCode { get; set; }
    }
}
