using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace asp_mvc.DAL
{
    public interface IRepository<T> : IReadOnlyRepository<T>, IDisposable
    {
        Task Create(T model);
        // T Update(T model);
        Task DeleteById(int id);
        void Save();
    }
}
