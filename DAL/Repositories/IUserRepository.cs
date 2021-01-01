using asp_mvc.Models;

namespace asp_mvc.DAL
{
    public interface IUserRepository : IRepository<User>
    {
        User RetrieveUserByEmail(string email);
        void DeleteByEmail(string email);
    }
}
