using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using asp_mvc.Models;
using asp_mvc.DAL.Repositories;
using asp_mvc.Utilities;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _commentRepo;
        public CommentController(ICommentRepository commentRepo)
        {
            _commentRepo = commentRepo;
        }

        [HttpGet("get-comments")]
        public async Task<ActionResult> GetComments()
        {
            List<UserComment> comments = await _commentRepo.RetrieveAllUsersComments();
            return Ok(comments);
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPost("post-comment")]
        public async Task<ActionResult> PostComment([FromBody]Comment comment)
        {
            comment.SentTime = DateTime.UtcNow;
            await _commentRepo.Create(comment);
            return Ok();
        }
    }
}