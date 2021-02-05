using System;
using System.Threading.Tasks;
using System.Collections.Generic;
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
            await context.Friendship.FromSqlInterpolated($"INSERT INTO \"Friendship\" (UserId, FriendId) OUTPUT INSERTED.* VALUES ({newFriendship.UserId}, {newFriendship.FriendId})").ToListAsync();
        }

        public async Task<List<UserFriendship>> RetrievePendingRequests(int currentUserId)
        {
            return await context.UserFriendship.FromSqlInterpolated($"SELECT UserId, FriendId, Id, Email, FirstName, LastName, Status FROM \"Friendship\" INNER JOIN \"User\" ON \"User\".Id = \"Friendship\".FriendId WHERE UserId = {currentUserId} AND Status = 0").ToListAsync();
        }

        public async Task<List<UserFriendship>> RetrieveFriends(int userId)
        {
            return await context.UserFriendship.FromSqlInterpolated($"SELECT UserId, FriendId, Id, Email, FirstName, LastName, Status FROM \"Friendship\" INNER JOIN \"User\" ON \"User\".Id = \"Friendship\".FriendId WHERE UserId = {userId} AND Status = 1").ToListAsync();
        }

        // Accept a request
        public async override Task Update(Friendship friendship)
        {
            await context.Friendship.FromSqlInterpolated($"UPDATE \"Friendship\" SET Status = 1 OUTPUT INSERTED.* WHERE UserId = {friendship.UserId} AND FriendId = {friendship.FriendId}").IgnoreQueryFilters().ToListAsync();
        }

        // Delete a friend or decline a request
        public override async Task DeleteById(int friendId)
        {
            await context.Friendship.FromSqlRaw($"DELETE FROM \"Friendship\" OUTPUT DELETED.* WHERE FriendId = {friendId}").IgnoreQueryFilters().ToListAsync();
        }
    }
}