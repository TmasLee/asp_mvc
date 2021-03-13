using System.Threading.Tasks;
using System.Collections.Generic;

using asp_mvc.Models;
using asp_mvc.Utilities.POCO;

namespace asp_mvc.DAL.Repositories
{
    public interface IFriendshipRepository : IBaseRepository<Friendship>
    {
        Task<List<FriendRequest>> RetrievePendingRequests(int currentUserId);
        Task<List<FriendRequest>> RetrievePendingSentRequests(int currentUserId);
        Task<List<FriendRequest>> RetrievePendingRequest(FriendRequest friendRequest);
        Task<List<UserFriendship>> RetrieveFriends(int userId);
        Task Delete(Friendship friendship);
    }
}