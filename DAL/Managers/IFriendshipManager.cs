using System.Threading.Tasks;
using System.Collections.Generic;

using asp_mvc.Models;

namespace asp_mvc.DAL.Managers
{
    public interface IFriendshipManager
    {
        Task<Dictionary<string, List<UserFriendship>>> GetPendingRequests(int userId);
        Task CheckForPendingRequest(Friendship friendRequest);
    }
}
