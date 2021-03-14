using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using asp_mvc.Data;

namespace asp_mvc.DAL.Repositories
{
    public abstract class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        private bool _disposed = false;
        public string tableName;
        public DbSet<T> model;
        public MSAContext context;

        public virtual async Task Create(T model)
        {
            await context.AddAsync<T>(model);
            await context.SaveChangesAsync();
        }

        public async Task<T> Retrieve(int id)
        {
            return await model.FindAsync(id);
        }

        public async Task<List<T>> RetrieveAll()
        {
            string q = $@"
            SELECT
                *
            FROM
                ""{tableName}""
            ";
            return await model.FromSqlRaw(q).ToListAsync<T>();
        }

        public abstract Task Update(T model);

        // SQL INJECTION DANGER
        public virtual async Task Delete(int id)
        {
            string q = $@"
            DELETE
            FROM
                ""{tableName}"" OUTPUT DELETED.*
            WHERE
                Id = {id}
            ";
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
