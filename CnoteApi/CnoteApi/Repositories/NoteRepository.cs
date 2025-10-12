using CnoteApi.Database;
using CnoteApi.Models;
using CnoteApi.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace CnoteApi.Repositories
{
    public class NoteRepository : INoteRepository
    {
        private readonly AppDbContext _dbContext;
        public NoteRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<Note> Add(Note note)
        {
            await _dbContext.Notes.AddAsync(note);
            await _dbContext.SaveChangesAsync();
            return note;
        }

        public async Task<IList<Note>> GetAll(int userId)
        {
            IList<Note> notes = await _dbContext.Notes.AsNoTracking().Where(n => n.UserId == userId).ToListAsync();
            return notes;
        }
    }
}
