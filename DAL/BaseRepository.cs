using System;
using System.Collections.Generic;
using System.Linq;
using System.Data;
using System.Linq.Expressions;
using asp_mvc.Models;
using asp_mvc.Utilities;
using asp_mvc.Data;
using Microsoft.EntityFrameworkCore;

namespace asp_mvc.DAL
{
    public abstract class BaseRepository<T> : IRepository<T> where T : class
    {
        private bool disposed = false;
        public DbSet<T> model;
        public MSAContext _context;

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
            _context.User.FromSqlInterpolated($"DELETE FROM \"{model.GetType().Name}\" OUTPUT DELETED.* WHERE Id = {id};");
        }

        public void Save()
        {
            _context.SaveChanges();
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }

}
