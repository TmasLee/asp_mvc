using System.Threading.Tasks;
using System.Collections.Generic;

using asp_mvc.Models;
using asp_mvc.Utilities.POCO;

namespace asp_mvc.DAL.Repositories
{
    public interface IMessageRepository : IBaseRepository<Message>
    {
    }
}