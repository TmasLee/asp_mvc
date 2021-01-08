using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using asp_mvc.Models;
using asp_mvc.Utilities;
using asp_mvc.Utilities.Authentication;
using asp_mvc.Utilities.POCO;
using asp_mvc.DAL.Managers;

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
        public IActionResult Authenticate([FromBody] TokenRequest request)
        {
            _stupidLoader.LoadTime(2, 3);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            string token;

            if (_authService.IsAuthenticated(request, out token))
            {
                return Ok(token);
            }

            return BadRequest("Incorrect username or password!");
        }
    }
}