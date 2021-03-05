using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

using asp_mvc.DAL.Repositories;
using asp_mvc.Models;
using asp_mvc.DAL.Managers;

namespace asp_mvc.Hubs
{
    [Authorize]
    public class RequestsHub : Hub<IRequestsClient>
    {
        private readonly IFriendshipRepository _friendshipRepo;
        private readonly IFriendshipManager _friendshipMgr;
        private readonly IUserRepository _userRepo;
        public RequestsHub(IFriendshipRepository friendshipRepo, IUserRepository userRepo, IFriendshipManager friendshipMgr)
        {
            _friendshipRepo = friendshipRepo;
            _friendshipMgr = friendshipMgr;
            _userRepo = userRepo;
        }

        public async Task<int> GetRequestCount(int userId)
        {
            List<UserFriendship> requests = await _friendshipRepo.RetrievePendingRequests(userId);
            return requests.Count;
        }
    }
}