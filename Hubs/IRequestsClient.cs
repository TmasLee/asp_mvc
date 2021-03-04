using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.SignalR;

using asp_mvc.Controllers;
using asp_mvc.Models;

namespace asp_mvc.Hubs
{
    public interface IRequestsClient
    {
        Task Test();
        Task ReceiveMessage(string msg, List<UserFriendship> pendingRequests);
    }
}