using CnoteApi.Database;
using CnoteApi.Models;
using CnoteApi.Repositories.IRepositories;

namespace CnoteApi.Repositories
{
    public class RefreshTokenRepository : IRefreshTokenRepository
    {
        private readonly AppDbContext _dbContext;
        public RefreshTokenRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task AddAsync(RefreshToken token)
        {
            await _dbContext.RefreshTokens.AddAsync(token);
            await _dbContext.SaveChangesAsync();
        }
        public async Task RemoveByUserId(int userId)
        {
            IEnumerable<RefreshToken> tokens = _dbContext.RefreshTokens.Where(t => t.UserId == userId);
            _dbContext.RefreshTokens.RemoveRange(tokens);
            await _dbContext.SaveChangesAsync();
        }
    }
}
