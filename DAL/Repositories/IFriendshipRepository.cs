using System.Threading.Tasks;
using System.Collections.Generic;

using asp_mvc.Models;

namespace asp_mvc.DAL
{
    public interface IFriendshipRepository : IRepository<Friendship>
    {
        Task<List<UserFriendship>> RetrievePendingRequests(int currentUserId);
        Task<List<Friendship>> RetrieveFriends(int userId);
    }
}