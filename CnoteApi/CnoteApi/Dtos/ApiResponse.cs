using System.Net;

namespace CnoteApi.Dtos
{
    public class ApiResponse
    {
        public object? Data { get; set; }
        public string Message { get; set; } = string.Empty;
        public bool Success { get; set; }
        public HttpStatusCode StatusCode { get; set; }

        public static ApiResponse BadRequest(object? data = null, string msg = "")
        {
            return new ApiResponse
            {
                Data = data,
                Message = msg,
                Success = false,
                StatusCode = HttpStatusCode.BadRequest
            };
        }

        public static ApiResponse Created(object? data = null, string msg = "")
        {
            return new ApiResponse
            {
                Data = data,
                Message = msg,
                Success = true,
                StatusCode = HttpStatusCode.Created
            };
        }

        public static ApiResponse UnAuthorized(object? data = null, string msg = "")
        {
            return new ApiResponse
            {
                Data = data,
                Message = msg,
                Success = false,
                StatusCode = HttpStatusCode.Unauthorized
            };
        }

        public static ApiResponse Ok(object? data = null, string msg = "")
        {
            return new ApiResponse
            {
                Data = data,
                Message = msg,
                Success = true,
                StatusCode = HttpStatusCode.OK
            };
        }
    }
}
