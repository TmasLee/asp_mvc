using System;
using System.IO;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using asp_mvc.Models;

namespace asp_mvc.DAL
{
    // Interface for CRUD operations
    interface IUserRepository : IDisposable
    {
        void CreateUser(User user);
        IEnumerable<User> RetrieveUsers();
        List<User> RetrieveUserByEmail(String email);
        // void Update(User user);
        void Delete(String email);
        // void Save();
    }
}
