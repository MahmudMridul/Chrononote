using CnoteApi.Models;

namespace CnoteApi.Repositories
{
    public interface IUserRepository
    {
        Task<User> AddAsync(User user);
        Task<bool> UsernameExists(string username);
        Task<bool> EmailExists(string email);
    }
}
