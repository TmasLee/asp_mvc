using System.Threading.Tasks;

using asp_mvc.Models;

namespace asp_mvc.DAL.Repositories
{
    public interface IUserRepository : IRepository<User>
    {
        Task<User> Retrieve(string email);
        Task Delete(string email);
    }
}
