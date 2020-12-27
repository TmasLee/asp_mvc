using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System.Net.Mime;
using asp_mvc.Models;
using asp_mvc.Data;
using asp_mvc.DAL;
using asp_mvc.Utilities;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly StupidLoader _stupidLoader;
        public UserController(IUserRepository userRepository, StupidLoader stupidLoader)
        {
            _userRepo = userRepository;
            _stupidLoader = stupidLoader;
        }

        // Move email validation to server side to prevent posts not using the client form
        [HttpPost("/User/SignUp")]
        public IActionResult SignUp([FromBody]User newUser)
        {
            if (_userRepo.RetrieveUserByEmail(newUser.Email).Any())
            {
                return Conflict("Email already in use!");
            }
            _userRepo.CreateUser(newUser);
            return Ok("Registered!");
        }

        [HttpGet("/User/GetUsers")]
        public IActionResult RetrieveUsers()
        {
            var users = _userRepo.RetrieveUsers();
            return Ok(users);
        }

        [HttpPost("/User/Login")]
        public IActionResult Login([FromBody]User user)
        {
            // Check password
            // Validate password on model?
            if (!_userRepo.RetrieveUserByEmail(user.Email).Any())
            {
                return BadRequest("Incorrect username or password!");
            }
            return Ok(_stupidLoader.Authenticating);
        }

        // Set async
        [HttpGet("/User/ConnectToServices")]
        public IActionResult ConnectToServices()
        {
            _stupidLoader.LoadTime(1, 3);
            return Ok(_stupidLoader.Connecting);
        }

        // Set async
        [HttpGet("/User/GetUserDatas")]
        public IActionResult GetUserDatas()
        {
            _stupidLoader.LoadTime(1, 3);
            return Ok(_stupidLoader.GettingDatas);
        }

        // Set async
        [HttpGet("/User/LoseData")]
        public IActionResult LoseData()
        {
            _stupidLoader.LoadTime(3, 5);
            return Ok(_stupidLoader.LostProgress);
        }
    }
}
