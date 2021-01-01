using System;
using System.Collections.Generic;
using System.Linq;
using asp_mvc.Data;
using Microsoft.EntityFrameworkCore;

namespace asp_mvc.DAL
{
    public abstract class BaseRepository<T> : IRepository<T> where T : class
    {
        private bool _disposed = false;
        public string tableName;
        public DbSet<T> model;
        public MSAContext context;

        // Generic insert possible?
        public abstract void Create(T model);

        public T RetrieveById(int id)
        {
            return model.FromSqlInterpolated($"SELECT * FROM \"{model.GetType().Name}\" WHERE Id = {id}").FirstOrDefault();
        }

        public List<T> RetrieveAll()
        {
            return model.FromSqlRaw($"SELECT * FROM \"{model.GetType().Name}\";").ToList<T>();
        }

        // Generic update possible?
        // public abstract T Update(T model);

        public void DeleteById(int id)
        {
            context.User.FromSqlInterpolated($"DELETE FROM \"{model.GetType().Name}\" OUTPUT DELETED.* WHERE Id = {id};");
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
