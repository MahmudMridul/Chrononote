using CnoteApi.Database;
using CnoteApi.Models;
using CnoteApi.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace CnoteApi.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _dbContext;
        public UserRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> AddAsync(User user)
        {
            await _dbContext.Users.AddAsync(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }   

        public async Task<User?> GetUserByUsername(string? username)
        {
            return await _dbContext.Users.FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<bool> UsernameExists(string? username)
        {
            return await _dbContext.Users.AnyAsync(u => u.Username == username);
        }

        public async Task<bool> EmailExists(string? email)
        {
            return await _dbContext.Users.AnyAsync(u => u.Email == email);
        }
    }
}
