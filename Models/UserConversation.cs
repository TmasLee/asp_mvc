namespace asp_mvc.Models
{
    public class UserConversation
    {
        public int ConversationsId { get; set; }
        public Conversation Conversation { get; set; }
        public int UsersId { get; set; }
        public User User{ get; set; }
    }
}