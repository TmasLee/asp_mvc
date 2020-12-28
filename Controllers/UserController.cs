using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using asp_mvc.Models;
using asp_mvc.Data;
using asp_mvc.Utilities;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Route("[controller]/[action]")]
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

        // ActionResults (represent various HTTP statu codes) are used when multiple return types are possible
        // ActionResults<T> let you return either an ActionResult or specifc type, T.
        // ActionResult is limited to those classes which extend the ActionResult abstract class (which you could also do with custom code, but using an interface allows for something like multiple inheritance, while extending a class does not).
        // IActionResult allows a wider range of return types, including any custom code that implements the IActionResult interface.
        // IActionResult is used when multiple ActionResult return types are possible
        [HttpPost]
        public ActionResult SignUp([FromBody]User newUser)
        {
            try {
                _userMgr.AddUser(newUser);
            }
            catch (UserException e)
            {
                return BadRequest(e);
            }
            _stupidLoader.LoadTime(2);
            return Ok(StupidLoader.Registered);
        }

        [HttpPost]
        public ActionResult Login([FromBody]User user)
        {
            try {
                _userMgr.LogUserIn(user);
            }
            catch (UserException e){
                BadRequest(e);
            }
            return Ok(StupidLoader.Authenticating);
        }

        [HttpGet]
        public ActionResult ConnectToServices()
        {
            _stupidLoader.LoadTime(1, 3);
            return Ok(StupidLoader.Connecting);
        }

        [HttpGet]
        public ActionResult LoseData()
        {
            _stupidLoader.LoadTime(3, 5);
            return Ok(StupidLoader.LostProgress);
        }

        [HttpGet]
        public ActionResult GetUserDatas()
        {
            _stupidLoader.LoadTime(1, 3);
            return Ok(StupidLoader.GettingDatas);
        }
    }
}
