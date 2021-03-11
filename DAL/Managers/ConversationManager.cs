using System;
using System.Threading.Tasks;
using System.Collections.Generic;

using asp_mvc.Models;
using asp_mvc.DAL.Repositories;

namespace asp_mvc.DAL.Managers
{
    public class ConversationManager : IConversationManager
    {
        private readonly IUserRepository _userRepo;
        private readonly IConversationRepository _conversationRepo;
        private readonly IMessageRepository _messageRepo;

        public ConversationManager(
            IUserRepository userRepo,
            IConversationRepository conversationRepo,
            IMessageRepository messageRepo)
        {
            _userRepo = userRepo;
            _conversationRepo = conversationRepo;
            _messageRepo = messageRepo;
        }

        public async Task CreateConversation(User sender, User recipient, Message newMessage)
        {
            UserConversation userConvo = await _conversationRepo.RetrieveUserConversation(sender.Id, recipient.Id);

            if (userConvo != null)
            {
                Conversation convo = await _conversationRepo.Retrieve(userConvo.ConversationsId);
                newMessage.Conversation = convo;
                await _messageRepo.Create(newMessage);
                return;
            }

            Conversation newConvo = new Conversation{};

            newConvo.UserConversations = new List<UserConversation>{
                new UserConversation {
                    Conversation = newConvo,
                    User = sender
                },
                new UserConversation {
                    Conversation = newConvo,
                    User = recipient
                }
            };

            newConvo.Messages = new List<Message>{newMessage};

            await _conversationRepo.Create(newConvo);
        }
    }
}
