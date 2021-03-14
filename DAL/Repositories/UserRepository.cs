using System;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(MSAContext dbContext)
        {
            model = dbContext.User;
            tableName = "User";
            context = dbContext;
        }

        public async override Task Create(User user)
        {
            await context.User.FromSqlInterpolated($@"
            INSERT INTO
                ""User"" (Email, FirstName, LastName, Password) OUTPUT INSERTED.* 
            VALUES
                (
                    {user.Email}, {user.FirstName}, {user.LastName}, {user.Password}
                )
            ").ToListAsync();
        }

        public async Task<User> Retrieve(string email)
        {
            return await context.User.FromSqlInterpolated($@"
            SELECT
                *
            FROM
                ""User""
                WHERE
                    email = {email}
            ").OrderBy(user => user.Email).FirstOrDefaultAsync<User>();
        }

        public async override Task Update(User user)
        {
            await context.User.FromSqlInterpolated($@"
            UPDATE
                ""User""
            SET
            ").FirstAsync();
        }

        public async Task Delete(string email)
        {
            await context.User.FromSqlInterpolated($@"
            DELETE
            FROM
                ""User"" OUTPUT DELETED.*
            WHERE
                email = {email}
            ").ToListAsync();
        }
    }
}