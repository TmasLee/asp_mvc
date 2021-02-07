using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

using asp_mvc.Models;

namespace asp_mvc.DAL.Managers
{
    public class FriendshipException : Exception
    {
        public FriendshipException() : base() { }
        public FriendshipException(string message) : base(message) { }
        public FriendshipException(string message, Exception inner) : base(message, inner) { }
        protected FriendshipException(System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }

    public class FriendshipManager : IFriendshipManager
    {
        private readonly IFriendshipRepository _friendshipRepo;
        public FriendshipManager(IFriendshipRepository friendshipRepo)
        {
            _friendshipRepo = friendshipRepo;
        }

        public async Task<Dictionary<string, List<UserFriendship>>> GetPendingRequests(int userId)
        {
            List<UserFriendship> pendingRequests = await _friendshipRepo.RetrievePendingRequests(userId);
            List<UserFriendship> pendingSentRequests = await _friendshipRepo.RetrievePendingSentRequests(userId);
            Dictionary<string, List<UserFriendship>> requests = 
                new Dictionary<string, List<UserFriendship>>()
                {
                    { "pendingRequests", pendingRequests },
                    { "pendingSentRequests", pendingSentRequests }
                };
            return requests;
        }

        public async Task CheckForPendingRequest(Friendship friendRequest)
        {
            List<UserFriendship> pendingRequest = await _friendshipRepo.RetrievePendingRequest(friendRequest);
            if (pendingRequest.Any())
            {
                throw new FriendshipException("Pending request already exists!");
            }
        }
    }
}