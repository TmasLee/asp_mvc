using System.Threading.Tasks;

using asp_mvc.Models;

namespace asp_mvc.DAL
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> RetrieveUserByEmail(string email);
        Task DeleteByEmail(string email);
    }
}
