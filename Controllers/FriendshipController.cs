using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
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
        private readonly IFriendshipRepository _friendshipRepo;
        private readonly IFriendshipManager _friendshipMgr;
        private readonly IConversationManager _conversationMgr;
        private readonly IHubContext<FriendsHub, IFriendsClient> _friendsHub;
        private readonly StupidLoader _stupidloader;
        public FriendshipController(
            IUserRepository userRepo,
            IFriendshipRepository friendshipRepo,
            IFriendshipManager friendshipMgr,
            IConversationRepository conversationRepo,
            IConversationManager conversationMgr,
            IHubContext<FriendsHub, IFriendsClient> friendsHub,
            StupidLoader stupidLoader)
        {
            _userRepo = userRepo;
            _friendshipRepo = friendshipRepo;
            _friendshipMgr = friendshipMgr;
            _conversationMgr = conversationMgr;
            _friendsHub = friendsHub;
            _stupidloader = stupidLoader;
        }

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpPost("add-friend")]
        public async Task<ActionResult> AddFriendRequest([FromBody]FriendRequest friendRequest)
        {
            try
            {
                await _friendshipMgr.CheckForPendingRequest(friendRequest);
            }
            catch (FriendshipException e)
            {
                return BadRequest(e.Message);
            }

            await _friendshipMgr.AddFriend(friendRequest);

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

        [Authorize]
        [ServiceFilter(typeof(ApiAntiforgeryTokenAuthorizationFilter))]
        [HttpGet("give-friends")]
        public async Task<ActionResult> GiveFriends([FromQuery(Name = "currentUserId")]int currentUserId)
        {
            // TODO: Can reduce # of DB queries
            // TODO: Make less hacky 😅
            List<string> friendEmails = new List<string>();

            List<UserFriendship> friends = await _friendshipRepo.RetrieveFriends(currentUserId);
            friends.ForEach(friend => friendEmails.Add(friend.Email));

            Dictionary<string, List<FriendRequest>> pendingRequests = await _friendshipMgr.GetPendingRequests(currentUserId);
            pendingRequests["received"].ForEach(request => friendEmails.Add(request.Email));
            pendingRequests["sent"].ForEach(request => friendEmails.Add(request.Email));

            var generatedFriends = StupidStuff.friends.Where(
                userEmail => !friendEmails.Any(friendEmail => friendEmail == userEmail)).ToList<string>();

            var generatedMessages = StupidStuff.messages.GetRange(0, StupidStuff.messages.Count);
            var rand = new Random();

            foreach (string email in generatedFriends)
            {
                var user = await _userRepo.Retrieve(email);
                var messageIndex = rand.Next(generatedMessages.Count);

                FriendRequest newRequest = new FriendRequest
                {
                    UserId = user.Id,
                    FriendId = currentUserId,
                    Email = User.FindFirstValue(ClaimTypes.Email),
                    Text = generatedMessages[messageIndex]
                };

                generatedMessages.RemoveAt(messageIndex);

                await AddFriendRequest(newRequest);
                await _stupidloader.LoadTime(3);
            }

            return Ok();
        }
    }
}