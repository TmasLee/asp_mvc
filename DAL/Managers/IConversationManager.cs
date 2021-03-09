using System.Threading.Tasks;
using System.Collections.Generic;

using asp_mvc.Models;
using asp_mvc.Utilities.POCO;

namespace asp_mvc.DAL.Managers
{
    public interface IConversationManager
    {
        Task CreateConversation(User sender, User recipient, Message message);
    }
}
