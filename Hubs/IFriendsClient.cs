using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using asp_mvc.Models;

namespace asp_mvc.Hubs
{
    public interface IFriendsClient
    {
        Task Test();
        Task ReceiveRequestsList(Dictionary<string, List<UserFriendship>> requests);
    }
}