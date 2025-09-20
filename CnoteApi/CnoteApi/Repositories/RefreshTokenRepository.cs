using CnoteApi.Database;
using CnoteApi.Models;

namespace CnoteApi.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly AppDbContext _dbContext;
        public RefreshTokenRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async void AddAsync(RefreshToken token)
        {
            await _dbContext.RefreshTokens.AddAsync(token);
            await _dbContext.SaveChangesAsync();
        }
    }
}
