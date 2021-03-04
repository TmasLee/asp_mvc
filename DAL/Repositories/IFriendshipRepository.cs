using System.Threading.Tasks;
using System.Collections.Generic;

using asp_mvc.Models;

namespace asp_mvc.DAL.Repositories
{
    public interface IFriendshipRepository : IBaseRepository<Friendship>
    {
        Task<List<UserFriendship>> RetrieveAllPendingRequests(int currentUserId);
        Task<List<UserFriendship>> RetrievePendingRequests(int currentUserId);
        Task<List<UserFriendship>> RetrievePendingSentRequests(int currentUserId);
        Task<List<UserFriendship>> RetrievePendingRequest(Friendship friendRequest);
        Task<List<UserFriendship>> RetrieveFriends(int userId);
    }
}