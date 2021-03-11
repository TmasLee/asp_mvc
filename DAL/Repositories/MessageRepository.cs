using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL.Repositories
{
    public class MessageRepository : BaseRepository<Message>, IMessageRepository
    {
        public MessageRepository(MSAContext dbContext)
        {
            model = dbContext.Message;
            tableName = "Message";
            context = dbContext;
        }

        public async override Task Create(Message message)
        {
            context.Message.Add(message);
            await context.SaveChangesAsync();
        }

        public async override Task Update(Message message)
        {
            await context.Message.FromSqlInterpolated($@"").FirstOrDefaultAsync<Message>();
        }
    }
}