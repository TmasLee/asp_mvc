using asp_mvc.Models;
using Microsoft.EntityFrameworkCore;

namespace asp_mvc.Data
{
    public class MSAContext : DbContext
    {
        public DbSet<User> User { get; set; }
        public DbSet<Friendship> Friendship { get; set; }
        public DbSet<UserFriendship> UserFriendship { get; set; }
        public DbSet<FriendRequest> FriendRequest { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<Conversation> Conversation { get; set; }
        public DbSet<UserConversation> UserConversation { get; set; }
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
            modelBuilder.Entity<FriendRequest>()
                        .HasNoKey();

            // Many-to-many relation between User and Conversation
            modelBuilder.Entity<UserConversation>()
                        .HasKey(entity => new
                        {
                            entity.UsersId,
                            entity.ConversationsId
                        });
            modelBuilder.Entity<UserConversation>()
                        .HasOne(UserConversation => UserConversation.User)
                        .WithMany(User => User.UserConversations)
                        .HasForeignKey(UserConversation => UserConversation.UsersId);
            modelBuilder.Entity<UserConversation>()
                        .HasOne(UserConversation => UserConversation.Conversation)
                        .WithMany(Conversation => Conversation.UserConversations)
                        .HasForeignKey(UserConversation => UserConversation.ConversationsId);

            modelBuilder.Entity<Message>()
                        .HasKey(entity => new
                        {
                            entity.SenderId,
                            entity.SentTime
                        });
            // One-to-many relation between User and Message
            modelBuilder.Entity<Message>()
                        .HasOne(Message => Message.Sender)
                        .WithMany(User => User.Messages)
                        .OnDelete(DeleteBehavior.NoAction);
            // One-to-many relation between Conversation and Message
            modelBuilder.Entity<Message>()
                        .HasOne(Message => Message.Conversation)
                        .WithMany(Conversation => Conversation.Messages)
                        .OnDelete(DeleteBehavior.NoAction);
            modelBuilder.Entity<Message>()
                        .HasOne(Message => Message.Friendship)
                        .WithOne(Friendship => Friendship.Message)
                        .HasForeignKey<Friendship>(Friendship => new {Friendship.UserId, Friendship.SentTime});
        }
    }
}