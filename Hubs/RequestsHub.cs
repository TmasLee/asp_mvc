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
        // public readonly ConcurrentDictionary<int, HashSet<string>> connections = new ConcurrentDictionary<int, HashSet<string>>();
        public RequestsHub(IFriendshipRepository friendshipRepo, IUserRepository userRepo, IUserIdProvider userProvider)
        {
            _friendshipRepo = friendshipRepo;
            _userRepo = userRepo;
        }

        public override async Task OnConnectedAsync()
        {
            string userEmail = Context.User.FindFirst(ClaimTypes.Email).Value;
            // User user = await _userRepo.Retrieve(userEmail);

            await Groups.AddToGroupAsync(Context.ConnectionId, userEmail);

            // var userConnections = connections.GetOrAdd(user.Id,  new HashSet<string>());

            // lock (userConnections)
            // {
            //     userConnections.Add(Context.ConnectionId);
            // }

            await base.OnConnectedAsync();
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            return base.OnDisconnectedAsync(exception);
        }

        public async Task Test2(string connectionId)
        {
            await Clients.Client(connectionId).Test();
        }
    }
}