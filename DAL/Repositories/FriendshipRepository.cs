using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;

using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL
{
    public class FriendshipRepository : BaseRepository<Friendship>, IFriendshipRepository
    {
        public FriendshipRepository(MSAContext dbContext)
        {
            model = dbContext.Friendship;
            tableName = "Friendship";
            context = dbContext;
        }

        public async override Task Create(Friendship newFriendship)
        {
            Console.WriteLine(newFriendship.UserId);
            Console.WriteLine(newFriendship.FriendId);
            await context.Friendship.FromSqlInterpolated($"INSERT INTO \"Friendship\" (UserId, FriendId) OUTPUT INSERTED.* VALUES ({newFriendship.UserId}, {newFriendship.FriendId})").ToListAsync();
        }
    }
}