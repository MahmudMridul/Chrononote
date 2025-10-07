using CnoteApi.Database;
using CnoteApi.Models;
using Microsoft.EntityFrameworkCore;

namespace CnoteApi.Repositories
{
    public class ProjectRepository : IProjectRepository 
    {
        private readonly AppDbContext _dbContext;
        public ProjectRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IEnumerable<Project>> GetAll()
        {
            return await _dbContext.Projects.ToListAsync();
        }

        public async Task<Project> Add(Project project)
        {
            _dbContext.Projects.Add(project);
            await _dbContext.SaveChangesAsync();
            return project;
        }

        public async Task<Project?> Delete(int id)
        {
            var project = await _dbContext.Projects.FindAsync(id);
            if (project == null)
            {
                return null;
            }
            _dbContext.Projects.Remove(project);
            await _dbContext.SaveChangesAsync();
            return project;
        }
    }
}
