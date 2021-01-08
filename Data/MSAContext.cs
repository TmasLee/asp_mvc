using asp_mvc.Models;
using Microsoft.EntityFrameworkCore;

namespace asp_mvc.Data
{
    public class MSAContext : DbContext
    {
        public MSAContext(DbContextOptions<MSAContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
    }
}