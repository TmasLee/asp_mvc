using System;

namespace asp_mvc.Models
{
    /*
    Keyless entity to map rows returned by joining User and Comments
    */
    public class UserComment
    {
        public int UserId { get; set; }
        public string Email { get; set; }
        public string Text { get; set; }
        public DateTime SentTime { get; set; }
    }
}
