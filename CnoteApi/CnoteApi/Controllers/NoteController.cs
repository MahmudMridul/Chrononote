using CnoteApi.Dtos;
using CnoteApi.Models;
using CnoteApi.Repositories.IRepositories;
using Microsoft.AspNetCore.Mvc;


namespace CnoteApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NoteController : ControllerBase
    {
        private readonly INoteRepository _noteRepository;
        public NoteController(INoteRepository noteRepository)
        {
            _noteRepository = noteRepository;
        }

        [HttpPost("all")]
        public async Task<ActionResult<ApiResponse>> GetAll(int userId)
        {
            IList<Note> notes = await _noteRepository.GetAll(userId);
            ApiResponse res = ApiResponse.Ok(notes, "Success");
            return Ok(res);
        }

        [HttpPost("add")]
        public async Task<ActionResult<ApiResponse>> Add(NoteDto noteDto)
        {
            Note note = new Note
            {
                Content = noteDto.Content,
                UserId = noteDto.UserId,
                CreatedAt = DateTime.UtcNow
            };
            Note newNote = await _noteRepository.Add(note);
            ApiResponse res = ApiResponse.Created(newNote, "Success");
            return Created("", res);
        }
    }
}
