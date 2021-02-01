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
            string q = $"SELECT * FROM \"{tableName}\" WHERE Id = {id}";
            return await model.FromSqlRaw(q).FirstOrDefaultAsync<T>();
        }

        public async Task<List<T>> RetrieveAll()
        {
            string q = $"SELECT * FROM \"{tableName}\"";
            return await model.FromSqlRaw(q).ToListAsync<T>();
        }

        // Generic update possible?
        // public abstract T Update(T model);

        public virtual async Task DeleteById(int id)
        {
            string q = $"DELETE FROM \"{tableName}\" OUTPUT DELETED.* WHERE Id = {id}";
            await model.FromSqlRaw(q).FirstAsync();
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
