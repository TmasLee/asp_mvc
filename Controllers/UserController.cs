using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

using asp_mvc.Models;
using asp_mvc.DAL.Managers;
using asp_mvc.DAL;
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
        private readonly IUserRepository _userRepo;
        private readonly IFriendshipRepository _friendshipRepo;
        private readonly IFriendshipManager _friendshipMgr;
        public UserController(
            StupidLoader stupidLoader,
            IUserManager userMgr,
            IUserRepository userRepo,
            IFriendshipRepository friendshipRepo)
        {
            _userMgr = userMgr;
            _stupidLoader = stupidLoader;
            _userRepo = userRepo;
            _friendshipRepo = friendshipRepo;
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
            await _stupidLoader.LoadTime(1, 2);
            return Ok();
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("lose-data")]
        public async Task<ActionResult> LoseData()
        {
            await _stupidLoader.LoadTime(2, 3);
            return Ok();
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("get-current-user-datass")]
        public async Task<ActionResult> GetUserDatas()
        {
            var email = User.Claims.Where(x => x.Type == ClaimTypes.Email).FirstOrDefault()?.Value;
            User user = await _userRepo.RetrieveUserByEmail(email);
            UserDto userDto = user.ToDto();

            return Ok(userDto);
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("get-user")]
        public async Task<ActionResult> GetUser([FromQuery(Name = "userId")]int userId)
        {
            User user = await _userRepo.RetrieveById(userId);
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

        [HttpGet("get-friends")]
        public async Task<ActionResult> GetFriends()
        {
            List<Friendship> friends = await _friendshipRepo.RetrieveAll();
            List<UserDto> friendDtos = new List<UserDto>();

            return Ok(friendDtos);
        }

        [HttpPost("add-friend")]
        public async Task<ActionResult> AddFriend([FromBody]Friendship newFriendship)
        {
            // await _friendshipMgr.MakeFriendship();
            await _friendshipRepo.Create(newFriendship);

            return Ok();
        }

        [HttpPost("remove-friend")]
        public async Task<ActionResult> RemoveFriend([FromBody]User formerFriend)
        {
            List<Friendship> friends = await _friendshipRepo.RetrieveAll();
            List<UserDto> friendDtos = new List<UserDto>();

            return Ok();
        }

    }
}
