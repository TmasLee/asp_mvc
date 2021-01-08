using asp_mvc.Models;
using asp_mvc.Utilities.POCO;

namespace asp_mvc.DAL.Managers
{
    public interface IUserManager
    {
        void VerifyEmail(string email);
        bool CheckPassword(string password, string storedPassword);
        string HashPassword(string password);
        void AddUser(User newUser);
        bool IsValidUser(string email, string password);
    }
}
