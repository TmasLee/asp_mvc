using System.Threading.Tasks;
using System.Collections.Generic;

using asp_mvc.Models;

namespace asp_mvc.DAL.Managers
{
    public interface IFriendshipManager
    {
        Task<Dictionary<string, List<FriendRequest>>> GetPendingRequests(int userId);
        Task CheckForPendingRequest(FriendRequest friendRequest);
    }
}
