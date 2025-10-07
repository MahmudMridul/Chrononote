using CnoteApi.Dtos;
using CnoteApi.Models;
using CnoteApi.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace CnoteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {
        private readonly IProjectRepository _projectRepo;

        public ProjectController(IProjectRepository projectRepo)
        {
            _projectRepo = projectRepo;
        }

        [HttpGet("all")]
        public async Task<ActionResult<ApiResponse>> GetAll()
        {
            IEnumerable<Project> projects = await _projectRepo.GetAll();
            ApiResponse res = ApiResponse.Ok(data: projects, msg: "Success");
            return Ok(res);
        }

        [HttpPost("add")]
        public async Task<ActionResult<ApiResponse>> Add([FromBody] ProjectDto projectDto)
        {
            Project newProject = new Project
            {
                Name = projectDto.Name
            };
            Project addedProject = await _projectRepo.Add(newProject);
            ApiResponse res = ApiResponse.Created(data: addedProject, msg: "Project created successfully");
            return Created("", res);
        }
    }
}
