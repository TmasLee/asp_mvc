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
            User user = await _userRepo.RetrieveUserByEmail(email);

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

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPost("add-friend")]
        public async Task<ActionResult> AddFriendRequest([FromBody]Friendship friendRequest)
        {
            try
            {
                await _friendshipMgr.CheckForPendingRequest(friendRequest);
            }
            catch (FriendshipException e)
            {
                return BadRequest(e.Message);
            }

            await _friendshipRepo.Create(friendRequest);
            return Ok();
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPost("remove-friend")]
        public async Task<ActionResult> RemoveFriend([FromBody]Friendship friendship)
        {
            await _friendshipRepo.DeleteById(friendship.FriendId);
            List<UserFriendship> friends = await _friendshipRepo.RetrieveFriends(friendship.UserId);
            return Ok(friends);
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("get-requests")]
        public async Task<ActionResult> GetRequests([FromQuery(Name = "currentUserId")]int currentUserId)
        {
            var requests = await _friendshipMgr.GetPendingRequests(currentUserId);
            return Ok(requests);
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPut("accept-request")]
        public async Task<ActionResult> AcceptRequest([FromBody]Friendship friendRequest)
        {
            await _friendshipRepo.Update(friendRequest);
            var requests = await _friendshipMgr.GetPendingRequests(friendRequest.UserId);
            return Ok(requests);
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPost("decline-request")]
        public async Task<ActionResult> DeclineRequest([FromBody]Friendship friendRequest)
        {
            await _friendshipRepo.DeleteById(friendRequest.FriendId);
            var requests = await _friendshipMgr.GetPendingRequests(friendRequest.UserId);
            return Ok(requests);
        }
    }
}