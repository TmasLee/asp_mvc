using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(MSAContext context)
        {
            _context = context;
        }

        public override void Create(User user)
        {
            _context.User.FromSqlInterpolated($"INSERT INTO \"User\" (Email, FirstName, LastName, Password) OUTPUT INSERTED.* VALUES ({user.Email}, {user.FirstName}, {user.LastName}, {user.Password});");
        }

        public User RetrieveUserByEmail(string email)
        {
            return _context.User.FromSqlInterpolated($"SELECT * FROM \"User\" WHERE email = {email}").FirstOrDefault();
        }

        // public override User Update(User user)
        // {
        //     return _context.User.FromSqlInterpolated($"UPDATE \"User\" SET ");
        // }

        public void DeleteByEmail(string email)
        {
            _context.User.FromSqlInterpolated($"DELETE FROM \"User\" OUTPUT DELETED.* WHERE email = {email};");
        }
    }
}