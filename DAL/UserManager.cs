
using System;
using System.IO;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using asp_mvc.Models;

// Manager classes should have context injected too
// Raw SQL queries should be separated from controller? Maybe into Repository classes?
// Practice for implementing business logic 
// Don't want to rely on ORM so making my own 
namespace asp_mvc.Data
{
    public class UserManager
    {
        private readonly MSAContext _context;
        public UserManager(MSAContext context)
        {
            _context = context;
        }
        // public Boolean EmailValid(String email)
        // {
        //     Boolean isValid = user.Any() ? false : true;
        //     return isValid;
        // }

    }
}
