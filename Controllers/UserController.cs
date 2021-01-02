using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
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
        public async Task<ActionResult> Login([FromBody]User user)
        {
            try {
                _userMgr.LogUserIn(user);

                List<Claim> claims = new List<Claim>()
                {
                    new Claim(ClaimTypes.Email, user.Email),
                    new Claim(ClaimTypes.Name, user.FirstName),
                    new Claim(ClaimTypes.Surname, user.LastName),
                };
                var claimsIdentity = new ClaimsIdentity(
                    claims, CookieAuthenticationDefaults.AuthenticationScheme);

                var authProperties = new AuthenticationProperties
                {
                    //AllowRefresh = <bool>,
                    // Refreshing the authentication session should be allowed.

                    //ExpiresUtc = DateTimeOffset.UtcNow.AddMinutes(10),
                    // The time at which the authentication ticket expires. A 
                    // value set here overrides the ExpireTimeSpan option of 
                    // CookieAuthenticationOptions set with AddCookie.

                    //IsPersistent = true,
                    // Whether the authentication session is persisted across 
                    // multiple requests. When used with cookies, controls
                    // whether the cookie's lifetime is absolute (matching the
                    // lifetime of the authentication ticket) or session-based.

                    //IssuedUtc = <DateTimeOffset>,
                    // The time at which the authentication ticket was issued.

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
            // Redirect with user data
            _stupidLoader.LoadTime(1, 3);
            return Redirect("/");
        }

        [HttpGet]
        public async Task<ActionResult> LogOut()
        {
            await HttpContext.SignOutAsync(
                CookieAuthenticationDefaults.AuthenticationScheme);
            return Ok();
        }
    }
}
