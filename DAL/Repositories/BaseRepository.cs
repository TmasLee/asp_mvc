using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using asp_mvc.Data;

namespace asp_mvc.DAL
{
    public abstract class BaseRepository<T> : IRepository<T> where T : class
    {
        private bool _disposed = false;
        public string tableName;
        public DbSet<T> model;
        public MSAContext context;

        // Generic insert possible?
        public abstract Task Create(T model);

        public async Task<T> RetrieveById(int id)
        {
            return await model.FromSqlInterpolated($"SELECT * FROM \"{model.GetType().Name}\" WHERE Id = {id}").FirstOrDefaultAsync<T>();
        }

        public async Task<List<T>> RetrieveAll()
        {
            return await model.FromSqlInterpolated($"SELECT * FROM \"{model.GetType().Name}\"").ToListAsync<T>();
        }

        // Generic update possible?
        // public abstract T Update(T model);

        public async Task DeleteById(int id)
        {
            await model.FromSqlInterpolated($"DELETE FROM \"{model.GetType().Name}\" OUTPUT DELETED.* WHERE Id = {id}").FirstAsync();
        }

        public void Save()
        {
            context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }

}
