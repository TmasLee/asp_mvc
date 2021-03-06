using System.Threading.Tasks;
using System.Collections.Generic;

namespace asp_mvc.DAL.Repositories
{
    public interface IReadOnlyRepository<T>
    {
        Task<T> Retrieve(int id);
        Task<List<T>> RetrieveAll();
    }
}
