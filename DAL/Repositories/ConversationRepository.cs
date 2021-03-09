using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;

using asp_mvc.Models;
using asp_mvc.Data;
using asp_mvc.Utilities.POCO;

namespace asp_mvc.DAL.Repositories
{
    public class ConversationRepository : BaseRepository<Conversation>, IConversationRepository
    {
        public ConversationRepository(MSAContext dbContext)
        {
            model = dbContext.Conversation;
            tableName = "Conversation";
            context = dbContext;
        }

        public async override Task Create(Conversation conversation)
        {
            context.Conversation.Add(conversation);
            await context.SaveChangesAsync();
        }

        public async Task<UserConversation> RetrieveUserConversation(List<int> userIds)
        {
            UserConversation userConvo = await context.UserConversation.Join(context.Conversation,
                userConvo => userConvo.ConversationsId,
                convo => convo.Id,
                (userConvo, convo) => userConvo)
                .Where(userConvo => userIds.Contains(userConvo.UsersId)
                ).FirstOrDefaultAsync<UserConversation>();
            return userConvo;
        }

        public async override Task Update(Conversation conversation)
        {
        }
    }
}