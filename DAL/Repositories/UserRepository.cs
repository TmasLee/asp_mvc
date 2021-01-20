using System;
using System.Threading.Tasks; 
using System.Linq;
using Microsoft.EntityFrameworkCore;

using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(MSAContext dbContext)
        {
            model = dbContext.User;
            tableName = model.GetType().Name;
            context = dbContext;
        }

        public async override Task Create(User user)
        {
            await context.User.FromSqlInterpolated($"INSERT INTO \"User\" (Email, FirstName, LastName, Password) OUTPUT INSERTED.* VALUES ({user.Email}, {user.FirstName}, {user.LastName}, {user.Password});").FirstOrDefaultAsync();
        }

        public async Task<User> RetrieveUserByEmail(string email)
        {
            return await context.User.FromSqlInterpolated($"SELECT * FROM \"User\" WHERE email = {email}").FirstOrDefaultAsync<User>();
        }

        // public override User Update(User user)
        // {
        //     return _context.User.FromSqlInterpolated($"UPDATE \"User\" SET ");
        // }

        public async Task DeleteByEmail(string email)
        {
            await context.User.FromSqlInterpolated($"DELETE FROM \"User\" OUTPUT DELETED.* WHERE email = {email};").ToListAsync();
        }
    }
}