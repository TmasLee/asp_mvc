using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using asp_mvc.Models;
using asp_mvc.Data;
using asp_mvc.Utilities;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Route("/User/")]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly StupidLoader _stupidLoader;
        private readonly UserManager _userMgr;
        public UserController(UserManager userMgr, StupidLoader stupidLoader)
        {
            _userMgr = userMgr;
            _stupidLoader = stupidLoader;
        }

        [HttpPost("/SignUp")]
        public IActionResult SignUp([FromBody]User newUser)
        {
            try {
                _userMgr.AddUser(newUser);
            }
            catch (UserException e)
            {
                return BadRequest(e);
            }
            return Ok("Registered!");
        }

        [HttpPost("/User/Login")]
        public IActionResult Login([FromBody]User user)
        {
            try {
                _userMgr.LogUserIn(user);
            }
            catch (UserException e){
                BadRequest(e);
            }
            return Ok(_stupidLoader.Authenticating);
        }

        [HttpGet("/User/ConnectToServices")]
        public IActionResult ConnectToServices()
        {
            _stupidLoader.LoadTime(1, 3);
            return Ok(_stupidLoader.Connecting);
        }

        [HttpGet("/User/GetUserDatas")]
        public IActionResult GetUserDatas()
        {
            _stupidLoader.LoadTime(1, 3);
            return Ok(_stupidLoader.GettingDatas);
        }

        [HttpGet("/User/LoseData")]
        public IActionResult LoseData()
        {
            _stupidLoader.LoadTime(3, 5);
            return Ok(_stupidLoader.LostProgress);
        }
    }
}
