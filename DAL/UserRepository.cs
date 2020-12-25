using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Data;
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
            Console.WriteLine(user);
            _context.User.FromSqlInterpolated($"INSERT INTO User (Email, FirstName, LastName, Password) VALUES ({user.Email}, {user.FirstName}, {user.LastName}, {user.Password});");
        }

        public IEnumerable<User> RetrieveUsers()
        {
            return _context.User.FromSqlRaw($"SELECT * FROM User;").ToList();
        }

        public List<User> RetrieveUserByEmail(String email)
        {
            return _context.User.FromSqlInterpolated($"SELECT * FROM User WHERE email = {email};").ToList();
        }

        // public User Update(User user){}

        public void Delete(String email)
        {
            _context.User.FromSqlInterpolated($"DELETE FROM User WHERE email = {email};");
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
    }
}