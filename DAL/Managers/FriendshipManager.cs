using System;
using System.Threading.Tasks;

using asp_mvc.Models;

namespace asp_mvc.DAL.Managers
{
    public class FriendshipManager : IFriendshipManager
    {
        private readonly IFriendshipRepository _friendshipRepository;
        public FriendshipManager(IFriendshipRepository friendshipRepository)
        {
            _friendshipRepository = friendshipRepository;
        }

        // public async Task MakeFriendship(User user, User newFriend)
        // (
        //     var x = _friendshipRepository.Create();
        // )
    }
}