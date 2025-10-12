using CnoteApi.Models;

namespace CnoteApi.Repositories.IRepositories
{
    public interface IRefreshTokenRepository
    {
        Task AddAsync(RefreshToken token);
        Task RemoveByUserId(int userId);
    }
}
