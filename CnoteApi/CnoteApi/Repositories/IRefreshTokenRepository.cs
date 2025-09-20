using CnoteApi.Models;

namespace CnoteApi.Repositories
{
    public interface IRefreshTokenRepository
    {
        void AddAsync(RefreshToken token);
    }
}
