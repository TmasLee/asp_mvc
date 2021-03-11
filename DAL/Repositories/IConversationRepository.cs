using System.Threading.Tasks;

using asp_mvc.Models;

namespace asp_mvc.DAL.Repositories
{
    public interface IConversationRepository : IBaseRepository<Conversation>
    {
        Task<UserConversation> RetrieveUserConversation(int senderId, int recipientId);
    }
}