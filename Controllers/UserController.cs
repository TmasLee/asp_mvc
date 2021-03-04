using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using asp_mvc.Models;
using asp_mvc.DAL.Managers;
using asp_mvc.DAL.Repositories;
using asp_mvc.Utilities;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class UserController : ControllerBase
    {
        private readonly StupidLoader _stupidLoader;
        private readonly IUserManager _userMgr;
        private readonly IUserRepository _userRepo;
        private readonly IFriendshipRepository _friendshipRepo;
        private readonly IFriendshipManager _friendshipMgr;
        public UserController(
            StupidLoader stupidLoader,
            IUserManager userMgr,
            IUserRepository userRepo,
            IFriendshipRepository friendshipRepo,
            IFriendshipManager friendshipMgr)
        {
            _userMgr = userMgr;
            _stupidLoader = stupidLoader;
            _userRepo = userRepo;
            _friendshipRepo = friendshipRepo;
            _friendshipMgr = friendshipMgr;
        }

        [HttpPost("signup")]
        public async Task<ActionResult> SignUp([FromBody]User newUser)
        {
            await _stupidLoader.LoadTime(2);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _userMgr.AddUser(newUser);
            }
            catch (UserException e)
            {
                return BadRequest(e.Message);
            }
            return Ok();
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("connect")]
        public async Task<ActionResult> ConnectToServices()
        {
            await _stupidLoader.LoadTime(2);
            return Ok();
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("lose-data")]
        public async Task<ActionResult> LoseData()
        {
            await _stupidLoader.LoadTime(2);
            return Ok();
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("get-current-user-datass")]
        public async Task<ActionResult> GetUserDatas()
        {
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()?.Value;
            User user = await _userRepo.Retrieve(email);

            List<UserFriendship> friends = await _friendshipRepo.RetrieveFriends(user.Id);
            var requests = await _friendshipRepo.RetrievePendingRequests(user.Id);

            UserDto userDto = user.CurrentUserToDto(friends);
            userDto.RequestCount = requests.Count;

            return Ok(userDto);
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("get-user")]
        public async Task<ActionResult> GetUser([FromQuery(Name = "userId")]int userId)
        {
            User user = await _userRepo.Retrieve(userId);
            UserDto userDto = user.ToDto();
            return Ok(userDto);
        }

        [HttpGet("get-users")]
        public async Task<ActionResult> GetUsers()
        {
            List<User> users = await _userRepo.RetrieveAll();
            List<UserDto> userDtos = new List<UserDto>();

            foreach (User user in users)
            {
                userDtos.Add(user.ToDto());
            }
            return Ok(userDtos);
        }
    }
}