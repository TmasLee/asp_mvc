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
        private readonly MSAContext _context;
        private readonly IUserRepository _userRepo;
        public UserController(MSAContext context)
        {
            // _context = context;
            _userRepo = new UserRepository(context);
        }

        [HttpPost("/User/SignUp")]
        public IActionResult SignUp([FromBody]User newUser)
        {
            // Console.WriteLine(newUser);
            _userRepo.CreateUser(newUser);
            return Ok(newUser);
        }

        // [HttpPost]
        // public int Login()
        // {
        //     return 0;
        // }
    }
}
