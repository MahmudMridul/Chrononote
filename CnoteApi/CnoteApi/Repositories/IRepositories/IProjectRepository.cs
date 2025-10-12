using CnoteApi.Dtos;
using CnoteApi.Models;

namespace CnoteApi.Repositories.IRepositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAll(int userId);
        Task<Project> Add(Project project);
        Task<Project?> Delete(int id);
        //Task<Project> Update(int id, Project project);
    }
}
