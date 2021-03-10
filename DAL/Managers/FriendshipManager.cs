using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

using asp_mvc.Models;
using asp_mvc.DAL.Repositories;

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

        public async Task<Dictionary<string, List<FriendRequest>>> GetPendingRequests(int userId)
        {
            List<FriendRequest> receivedRequests = await _friendshipRepo.RetrievePendingRequests(userId);
            List<FriendRequest> sentRequests = await _friendshipRepo.RetrievePendingSentRequests(userId);
            Dictionary<string, List<FriendRequest>> requests = 
                new Dictionary<string, List<FriendRequest>>()
                {
                    { "received", receivedRequests },
                    { "sent", sentRequests }
                };
            return requests;
        }

        public async Task CheckForPendingRequest(FriendRequest friendRequest)
        {
            List<FriendRequest> pendingRequest = await _friendshipRepo.RetrievePendingRequest(friendRequest);
            if (pendingRequest.Any())
            {
                throw new FriendshipException("Pending request exists!");
            }
        }
    }
}