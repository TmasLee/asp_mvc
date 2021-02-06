

namespace asp_mvc.Models
{
    public class Friendship
    {
        public User User { get; set; }
        public int UserId { get; set; }
        public User Friend { get; set; }
        public int FriendId { get; set; }
        public int Status { get; set; } // 0 = Pending, 1 = Accepted
    }
}