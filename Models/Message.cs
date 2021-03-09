using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace asp_mvc.Models
{
    public class Message
    {
        public User Sender { get; set; }
        public int SenderId { get; set; }
        public Conversation Conversation { get; set; }
        public int ConversationId { get; set; }
        public string Text { get; set; }
        public DateTime SentTime { get; set; }
        public Friendship Friendship { get; set; }
    }
}