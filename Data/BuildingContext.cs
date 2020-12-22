using asp_mvc.Models;
using Microsoft.EntityFrameworkCore;

namespace asp_mvc.Data
{
    public class BuildingContext : DbContext
    {
        public BuildingContext(DbContextOptions<BuildingContext> options) : base(options)
        {
        }

        public DbSet<User> User { get; set; }
        public DbSet<Building> Building { get; set; }
        public DbSet<Line> Line { get; set; }
    }
}