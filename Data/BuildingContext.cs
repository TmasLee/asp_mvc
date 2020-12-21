using asp_mvc.Models;
using Microsoft.EntityFrameworkCore;

namespace asp_mvc.Data
{
    public class BuildingContext : DbContext
    {
        public BuildingContext(DbContextOptions<BuildingContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Building> Buildings { get; set; }
        public DbSet<Line> Lines { get; set; }
    }
}