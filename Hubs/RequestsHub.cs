using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Collections.Concurrent;
using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.Authorization;

using asp_mvc.Controllers;
using asp_mvc.DAL.Repositories;
using asp_mvc.Models;

namespace asp_mvc.Hubs
{
    [Authorize]
    public class RequestsHub : Hub<IRequestsClient>
    {
        private readonly IFriendshipRepository _friendshipRepo;
        private readonly IUserRepository _userRepo;
        public RequestsHub(IFriendshipRepository friendshipRepo, IUserRepository userRepo, IUserIdProvider userProvider)
        {
            _friendshipRepo = friendshipRepo;
            _userRepo = userRepo;
        }

        public async Task Test2(string connectionId)
        {
            await Clients.Client(connectionId).Test();
        }
    }
}