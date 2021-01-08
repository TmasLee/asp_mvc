using System;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(MSAContext dbContext)
        {
            model = dbContext.User;
            tableName = model.GetType().Name;
            context = dbContext;
        }

        public override void Create(User user)
        {
            context.User.FromSqlInterpolated($"INSERT INTO \"User\" (Email, FirstName, LastName, Password, Salt) OUTPUT INSERTED.* VALUES ({user.Email}, {user.FirstName}, {user.LastName}, {user.Password});").ToList();
        }

        public User RetrieveUserByEmail(string email)
        {
            return context.User.FromSqlInterpolated($"SELECT * FROM \"User\" WHERE email = {email}").FirstOrDefault();
        }

        // public override User Update(User user)
        // {
        //     return _context.User.FromSqlInterpolated($"UPDATE \"User\" SET ");
        // }

        public void DeleteByEmail(string email)
        {
            context.User.FromSqlInterpolated($"DELETE FROM \"User\" OUTPUT DELETED.* WHERE email = {email};").ToList();
        }
    }
}