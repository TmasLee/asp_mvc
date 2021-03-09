

namespace asp_mvc.Models
{
    /*
    Keyless entity to map rows returned by joining User and Frienships and Message
    */
    public class FriendRequest
    {
        public int UserId { get; set; }
        public int FriendId { get; set; }
        // public int Id { get; set; }
        public string Email { get; set; }
        // public string FirstName { get; set; }
        // public string LastName { get; set; }
        public int Status { get; set; } // 0 = Pending, 1 = Accepted
        public string Text { get; set; }
    }
}
