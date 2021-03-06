using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

using asp_mvc.Models;
using asp_mvc.DAL.Managers;
using asp_mvc.DAL.Repositories;
using asp_mvc.Utilities;
using asp_mvc.Hubs;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class FriendshipController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IUserManager _userMgr;
        private readonly IFriendshipRepository _friendshipRepo;
        private readonly IFriendshipManager _friendshipMgr;
        private readonly IHubContext<FriendsHub, IFriendsClient> _friendsHub;
        public FriendshipController(
            IUserRepository userRepo,
            IUserManager userMgr,
            IFriendshipRepository friendshipRepo,
            IFriendshipManager friendshipMgr,
            IHubContext<FriendsHub, IFriendsClient> friendsHub)
        {
            _userRepo = userRepo;
            _userMgr = userMgr;
            _friendshipRepo = friendshipRepo;
            _friendshipMgr = friendshipMgr;
            _friendsHub = friendsHub;
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

            User friend = await _userRepo.Retrieve(friendRequest.FriendId);
            Dictionary<string, List<UserFriendship>> requests = await _friendshipMgr.GetPendingRequests(friend.Id);

            await _friendsHub.Clients.User(friend.Email).ReceiveRequestsList(requests);

            return Ok();
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("get-friends-list")]
        public async Task<ActionResult> GetFriendsList([FromQuery(Name = "currentUserId")]int currentUserId)
        {
            List<UserFriendship> friends = await _friendshipRepo.RetrieveFriends(currentUserId);
            return Ok(friends);
        }


        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPost("remove-friend")]
        public async Task<ActionResult> RemoveFriend([FromBody]Friendship friendship)
        {
            await _friendshipRepo.Delete(friendship);
            List<UserFriendship> friends = await _friendshipRepo.RetrieveFriends(friendship.UserId);
            return Ok(friends);
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("get-requests-list")]
        public async Task<ActionResult> GetRequests([FromQuery(Name = "currentUserId")]int currentUserId)
        {
            var requests = await _friendshipMgr.GetPendingRequests(currentUserId);
            return Ok(requests);
        }

        /*
        Request recipient user is friendId when accepting or declining requests
        */
        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPut("accept-request")]
        public async Task<ActionResult> AcceptRequest([FromBody]Friendship friendRequest)
        {
            await _friendshipRepo.Update(friendRequest);
            var requests = await _friendshipMgr.GetPendingRequests(friendRequest.FriendId);
            return Ok(requests);
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPost("decline-request")]
        public async Task<ActionResult> DeclineRequest([FromBody]Friendship friendRequest)
        {
            await _friendshipRepo.Delete(friendRequest);
            var requests = await _friendshipMgr.GetPendingRequests(friendRequest.FriendId);
            return Ok(requests);
        }
    }
}