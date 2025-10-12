using CnoteApi.Models;

namespace CnoteApi.Repositories.IRepositories
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User user);
        Task<User?> GetUserByUsername(string username);
        Task<bool> UsernameExists(string username);
        Task<bool> EmailExists(string email);
    }
}
