using CnoteApi.Models;

namespace CnoteApi.Repositories.IRepositories
{
    public interface INoteRepository
    {
        Task<IList<Note>> GetAll(int userId);
        Task<Note> Add(Note note);
    }
}
