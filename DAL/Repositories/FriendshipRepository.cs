using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Data.SqlClient;
using System.Linq;

using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL.Repositories
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
            try
            {
                FormattableString q = $@"
                INSERT INTO 
                    ""Friendship"" (UserId, FriendId) OUTPUT INSERTED.*
                VALUES
                    (
                        {newFriendship.UserId}, {newFriendship.FriendId}
                    )
                ";
                await context.Friendship.FromSqlInterpolated(q).ToListAsync();
            }
            catch (SqlException e)
            {
                Console.WriteLine(e.ToString());
            }
        }

        // Can use this to get all pending requests but requires front end parsing.
        // Or maybe handling parsing in FriendshipManager? 🤔
        public async Task<List<UserFriendship>> RetrieveAllPendingRequests(int currentUserId)
        {
            return await context.UserFriendship.FromSqlInterpolated($@"
            SELECT
                UserId,
                FriendId,
                Id,
                Email,
                FirstName,
                LastName,
                Status
            FROM
                ""Friendship""
                INNER JOIN
                    ""User""
                    ON ""User"".Id = ""Friendship"".UserId
            WHERE
                (
                    FriendId = {currentUserId}
                    AND Status = 0
                )
                OR
                (
                    UserId = {currentUserId}
                    AND Status = 0
                )
            ").ToListAsync();
        }

        public async Task<List<UserFriendship>> RetrievePendingRequests(int userId)
        {
            return await context.UserFriendship.FromSqlInterpolated($@"
            SELECT
                UserId,
                FriendId,
                Id,
                Email,
                FirstName,
                LastName,
                Status
            FROM
                ""Friendship""
                INNER JOIN
                    ""User""
                    ON ""User"".Id = ""Friendship"".UserId
            WHERE FriendId = {userId}
                AND Status = 0
            ").ToListAsync();
        }

        public async Task<List<UserFriendship>> RetrievePendingSentRequests(int userId)
        {
            return await context.UserFriendship.FromSqlInterpolated($@"
            SELECT
                UserId,
                FriendId,
                Id,
                Email,
                FirstName,
                LastName,
                Status
            FROM
                ""Friendship""
                INNER JOIN
                    ""User""
                    ON ""User"".Id = ""Friendship"".FriendId
            WHERE UserId = {userId}
                AND Status = 0
            ").ToListAsync();
        }

        public async Task<List<UserFriendship>> RetrievePendingRequest(Friendship friendRequest)
        {
            return await context.UserFriendship.FromSqlInterpolated($@"
            SELECT
                UserId,
                FriendId,
                Id,
                Email,
                FirstName,
                LastName,
                Status
            FROM
                ""Friendship""
                INNER JOIN
                    ""User""
                    ON ""User"".Id = ""Friendship"".UserId
            WHERE
                (
                    UserId = {friendRequest.UserId}
                    AND FriendId = {friendRequest.FriendId}
                    AND Status = 0
                )
                OR
                (
                    UserId = {friendRequest.FriendId}
                    AND FriendId = {friendRequest.UserId}
                    AND Status = 0
                )
            ").ToListAsync();
        }

        public async Task<List<UserFriendship>> RetrieveFriends(int userId)
        {
            return await context.UserFriendship.FromSqlInterpolated($@"
            SELECT
                UserId,
                FriendId,
                Id,
                Email,
                FirstName,
                LastName,
                Status
            FROM
                ""Friendship""
            INNER JOIN
                ""User""
                ON ""User"".Id =
                (
                    CASE
                        WHEN
                            UserId = {userId}
                            AND Status = 1
                        THEN
                            ""Friendship"".FriendId
                        WHEN
                            FriendId = {userId}
                            AND Status = 1
                        THEN
                            ""Friendship"".UserId
                    END
                )
            ").ToListAsync();
        }

        // Accept a request
        public async override Task Update(Friendship friendship)
        {
            await context.Friendship.FromSqlInterpolated($@"
            UPDATE
                ""Friendship""
            SET
                Status = 1 OUTPUT INSERTED.*
            WHERE
                (
                    UserId = {friendship.UserId} 
                    AND FriendId = {friendship.FriendId}
                )
            ").IgnoreQueryFilters().ToListAsync();
        }

        // Delete a friend or decline a request
        public async Task Delete(Friendship friendship)
        {
            await context.Friendship.FromSqlInterpolated($@"
            DELETE
            FROM
                ""Friendship"" OUTPUT DELETED.*
            WHERE
               (
                   UserId = {friendship.UserId}
                   AND FriendId = {friendship.FriendId}
                )
                OR
                (
                    UserId = {friendship.FriendId}
                    AND FriendId = {friendship.UserId}
                )
            ").IgnoreQueryFilters().ToListAsync();
        }
    }
}