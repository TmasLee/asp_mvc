using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.Net.Mime;
using asp_mvc.Models;
using asp_mvc.Data;
using asp_mvc.DAL;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        public UserController(IUserRepository userRepository)
        {
            _userRepo = userRepository;
        }

        [HttpPost("/User/SignUp")]
        public IActionResult SignUp([FromBody]User newUser)
        {
            if (_userRepo.RetrieveUserByEmail(newUser.Email).Any())
            {
                return Conflict("Email already in use!");
            }
            _userRepo.CreateUser(newUser);
            return Ok("Registered");
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
            var test = _userRepo.RetrieveUserByEmail(user.Email);
            return Ok(test);
        }
    }
}
