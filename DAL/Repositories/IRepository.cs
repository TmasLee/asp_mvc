using System;
using System.Threading.Tasks;

namespace asp_mvc.DAL.Repositories
{
    public interface IRepository<T> : IReadOnlyRepository<T>, IDisposable
    {
        Task Create(T model);
        Task Update(T model);
        Task Delete(int id);
        void Save();
    }
}
