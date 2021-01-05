using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using asp_mvc.Models;
using asp_mvc.Data;
using asp_mvc.Utilities;

// ActionResults (represent various HTTP status codes) are used when multiple return types are possible
// ActionResults<T> let you return either an ActionResult or specifc type, T.
// ActionResult is limited to those classes which extend the ActionResult abstract class (which you could also do with custom code, but using an interface allows for something like multiple inheritance, while extending a class does not).
// IActionResult allows a wider range of return types, including any custom code that implements the IActionResult interface.
// IActionResult is used when multiple ActionResult return types are possible
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

        [HttpPost]
        public ActionResult SignUp([FromBody]User newUser)
        {
            _stupidLoader.LoadTime(2);
            try {
                _userMgr.AddUser(newUser);
            }
            catch (UserException e)
            {
                return BadRequest(e.Message);
            }
            return Ok();
        }

        [HttpPost]
        public async Task<ActionResult> Login([FromBody]User user)
        {
            _stupidLoader.LoadTime(1, 3);
            try {
                User storedUser = _userMgr.LogUserIn(user);

                List<Claim> claims = new List<Claim>
                {
                    new Claim(ClaimTypes.Email, storedUser.Email),
                    new Claim(ClaimTypes.Name, storedUser.FirstName),
                    new Claim(ClaimTypes.Surname, storedUser.LastName),
                };
                var claimsIdentity = new ClaimsIdentity(
                    claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    IsPersistent = true,
                    //RedirectUri = <string>
                    // The full path or absolute URI to be used as an http 
                    // redirect response value.
                };

                await HttpContext.SignInAsync(
                    CookieAuthenticationDefaults.AuthenticationScheme,
                    new ClaimsPrincipal(claimsIdentity),
                    authProperties);
            }
            catch (UserException e){
                return BadRequest(e.Message);
            }
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public ActionResult ConnectToServices()
        {
            _stupidLoader.LoadTime(1, 3);
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public ActionResult LoseData()
        {
            _stupidLoader.LoadTime(3, 5);
            return Ok();
        }

        // Authorization based on cookie atm - need to figure out JWT implementation
        [Authorize]
        [HttpGet]
        public ActionResult GetUserDatas()
        {
            // Want to return User data from cookie
            _stupidLoader.LoadTime(1, 3);
            var cookie = Request.Cookies["UserSessionCookie"];
            return Ok();
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult> LogOut()
        {
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}
