using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL{
    public class UserRepository : IUserRepository, IDisposable
    {
        private readonly MSAContext _context;
        public UserRepository(MSAContext context)
        {
            _context = context;
        }

        public void CreateUser(User user)
        {
            _context.User.FromSqlInterpolated($"INSERT INTO \"User\" (Email, FirstName, LastName, Password) OUTPUT INSERTED.* VALUES ({user.Email}, {user.FirstName}, {user.LastName}, {user.Password});");
        }

        public async Task<List<User>> RetrieveUsers()
        {
            return await _context.User.FromSqlRaw($"SELECT * FROM \"User\";").ToListAsync();
        }

        public User RetrieveUserByEmail(string email)
        {
            return _context.User.FromSqlInterpolated($"SELECT * FROM \"User\" WHERE email = {email};").FirstOrDefault();
        }

        // public User Update(User user){}

        public void Delete(String email)
        {
            _context.User.FromSqlInterpolated($"DELETE FROM \"User\" OUTPUT DELETED.* WHERE email = {email};");
        }

        private bool disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public void Save()
        {
            _context.SaveChanges();
        }
    }
}