using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

using asp_mvc.DAL.Repositories;
using asp_mvc.Models;
using asp_mvc.DAL.Managers;

namespace asp_mvc.Hubs
{
    [Authorize]
    public class FriendsHub : Hub<IFriendsClient>
    {
        private readonly IFriendshipRepository _friendshipRepo;
        private readonly IFriendshipManager _friendshipMgr;
        private readonly IUserRepository _userRepo;
        public FriendsHub(IFriendshipRepository friendshipRepo, IUserRepository userRepo, IFriendshipManager friendshipMgr)
        {
            _friendshipRepo = friendshipRepo;
            _friendshipMgr = friendshipMgr;
            _userRepo = userRepo;
        }

        public async Task<int> GetRequestCount(int userId)
        {
            List<FriendRequest> requests = await _friendshipRepo.RetrievePendingRequests(userId);
            return requests.Count;
        }
    }
}