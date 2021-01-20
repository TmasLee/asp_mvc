using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Linq.Expressions;

using asp_mvc.Models;
using asp_mvc.Utilities;
using asp_mvc.Data;

namespace asp_mvc.DAL
{
    public interface IReadOnlyRepository<T>
    {
        Task<T> RetrieveById(int id);
        Task<List<T>> RetrieveAll();
    }
}
