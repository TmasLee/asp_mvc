using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using asp_mvc.Models;
using asp_mvc.Utilities.POCO;
using asp_mvc.DAL.Managers;
using asp_mvc.Utilities;

// ActionResults (represent various HTTP status codes) are used when multiple return types are possible
// ActionResults<T> let you return either an ActionResult or specifc type, T.
// ActionResult is limited to those classes which extend the ActionResult abstract class (which you could also do with custom code, but using an interface allows for something like multiple inheritance, while extending a class does not).
// IActionResult allows a wider range of return types, including any custom code that implements the IActionResult interface.
// IActionResult is used when multiple ActionResult return types are possible
namespace asp_mvc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly StupidLoader _stupidLoader;
        private readonly IUserManager _userMgr;
        public UserController(IUserManager userMgr, StupidLoader stupidLoader)
        {
            _userMgr = userMgr;
            _stupidLoader = stupidLoader;
        }

        [HttpPost("signup")]
        public ActionResult SignUp([FromBody]User newUser)
        {
            _stupidLoader.LoadTime(2);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                _userMgr.AddUser(newUser);
            }
            catch (UserException e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }

        [Authorize]
        [HttpGet("connect")]
        public ActionResult ConnectToServices()
        {
            _stupidLoader.LoadTime(2, 3);
            return Ok();
        }

        // [Authorize]
        [HttpGet("lose-data")]
        public ActionResult LoseData()
        {
            _stupidLoader.LoadTime(3, 4);
            return Ok();
        }

        // [Authorize]
        [HttpGet("get-user-datass")]
        public ActionResult GetUserDatas()
        {
            _stupidLoader.LoadTime(1, 3);
            return Ok();
        }

        // [Authorize]
        [HttpGet("logout")]
        public async Task<ActionResult> LogOut()
        {
            return Ok();
        }
    }
}
