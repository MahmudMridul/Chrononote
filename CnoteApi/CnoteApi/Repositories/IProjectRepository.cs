using CnoteApi.Dtos;
using CnoteApi.Models;

namespace CnoteApi.Repositories
{
    public interface IProjectRepository
    {
        Task<IEnumerable<Project>> GetAll();
        Task<Project> Add(Project project);
        Task<Project?> Delete(int id);
        //Task<Project> Update(int id, Project project);
    }
}
