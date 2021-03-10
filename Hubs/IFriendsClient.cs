using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using asp_mvc.Models;

namespace asp_mvc.Hubs
{
    public interface IFriendsClient
    {
        Task ReceiveRequestsList(Dictionary<string, List<FriendRequest>> requests);
        Task ReceiveNewrequest(FriendRequest friendRequest);
    }
}