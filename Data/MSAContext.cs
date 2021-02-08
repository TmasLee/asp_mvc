using asp_mvc.Models;
using Microsoft.EntityFrameworkCore;

namespace asp_mvc.Data
{
    public class MSAContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Friendship> Friendship { get; set; }
        public DbSet<UserFriendship> UserFriendship { get; set; }
        public MSAContext(DbContextOptions<MSAContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Composite primary key
            modelBuilder.Entity<Friendship>()
                        .HasKey(entity => new
                        {
                            entity.UserId,
                            entity.FriendId
                        });
            modelBuilder.Entity<Friendship>()
                        .HasOne(Friendship => Friendship.User)
                        .WithMany(User => User.Friends)
                        .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Friendship>()
                        .Property(Friendship => Friendship.Status)
                        .HasDefaultValue(0);

            modelBuilder.Entity<UserFriendship>()
                        .HasNoKey();

        }
    }
}