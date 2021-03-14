using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.SignalR;

using asp_mvc.Models;
using asp_mvc.DAL.Repositories;
using asp_mvc.Hubs;

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
        private readonly IUserRepository _userRepo;
        private readonly IConversationManager _conversationMgr;
        private readonly IHubContext<FriendsHub, IFriendsClient> _friendsHub;
        public FriendshipManager(
            IFriendshipRepository friendshipRepo,
            IUserRepository userRepo,
            IConversationManager conversationMgr,
            IHubContext<FriendsHub, IFriendsClient> friendsHub)
        {
            _friendshipRepo = friendshipRepo;
            _userRepo = userRepo;
            _conversationMgr = conversationMgr;
            _friendsHub = friendsHub;
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

        public async Task AddFriend(FriendRequest friendRequest)
        {
            User friend = await _userRepo.Retrieve(friendRequest.FriendId);
            User sender = await _userRepo.Retrieve(friendRequest.UserId);
            var timeNow = DateTime.UtcNow;

            Message newMessage = new Message
                {
                    Sender = sender,
                    Text = friendRequest.Text,
                    SentTime = timeNow
                };

            Friendship newFriendship = new Friendship
            {
                UserId = friendRequest.UserId,
                FriendId = friendRequest.FriendId,
                SentTime = timeNow,
            };

            await _conversationMgr.CreateConversation(sender, friend, newMessage);
            await _friendshipRepo.Create(newFriendship);

            Dictionary<string, List<FriendRequest>> requests = await GetPendingRequests(friend.Id);

            await _friendsHub.Clients.User(friend.Email).ReceiveRequestsList(requests);
            friendRequest.Email = sender.Email;
            await _friendsHub.Clients.User(friend.Email).ReceiveNewrequest(friendRequest);
        }
    }
}