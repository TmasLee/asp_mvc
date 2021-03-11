using System;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;

using asp_mvc.Models;
using asp_mvc.Data;

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

        public async Task<UserConversation> RetrieveUserConversation(int senderId, int recipientId)
        {
            return await context.UserConversation.FromSqlInterpolated($@"
            SELECT
                *
            FROM
                ""UserConversation""
            WHERE
                ConversationsId IN
                (
                    SELECT
                        ConversationsId
                    FROM 
                        UserConversation
                    WHERE
                        UsersId = {senderId}
                )
                AND UsersId = {recipientId}
            ").FirstOrDefaultAsync<UserConversation>();
        }

        public async override Task Update(Conversation conversation)
        {
            await context.Conversation.FromSqlInterpolated($@"").FirstOrDefaultAsync<Conversation>();
        }
    }
}