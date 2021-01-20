using System.Threading.Tasks;

using asp_mvc.Models;
using asp_mvc.Utilities.POCO;

namespace asp_mvc.DAL.Managers
{
    public interface IUserManager
    {
        Task VerifyEmail(string email);
        bool CheckPassword(string password, string storedPassword);
        string HashPassword(string password);
        byte[] GenerateSalt();
        Task AddUser(User newUser);
        Task<bool> IsValidUser(string email, string password);
    }
}
