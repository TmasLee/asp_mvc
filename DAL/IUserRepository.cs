using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using asp_mvc.Models;

namespace asp_mvc.DAL
{
    // Interface for CRUD operations
    public interface IUserRepository : IDisposable
    {
        void CreateUser(User user);
        Task<List<User>> RetrieveUsers();
        User RetrieveUserByEmail(String email);
        // void Update(User user);
        void Delete(String email);
        void Save();
    }
}
