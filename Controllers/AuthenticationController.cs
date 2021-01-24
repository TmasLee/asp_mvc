using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using asp_mvc.Utilities;
using asp_mvc.Utilities.Authentication;
using asp_mvc.Utilities.POCO;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AuthenticationController : ControllerBase
    {
        private readonly ITokenAuthService _authService;
        private readonly StupidLoader _stupidLoader;

        public AuthenticationController(ITokenAuthService authService, StupidLoader stupidLoader)
        {
            _authService = authService;
            _stupidLoader = stupidLoader;
        }

        [AllowAnonymous]
        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] TokenRequest request)
        {
            await _stupidLoader.LoadTime(2, 3);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            bool isAuthenticated = await _authService.IsAuthenticated(request);

            if (isAuthenticated)
            {
                return Ok();
            }

            return BadRequest("Incorrect username or password!");
        }

        [Authorize]
        [HttpGet("antiforgery")]
        public IActionResult Antiforgery()
        {
            _authService.GenerateCsrfToken();

            return Ok();
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("logout")]
        public ActionResult LogOut()
        {
            _authService.DeleteCookies();
            return Ok();
        }
    }
}