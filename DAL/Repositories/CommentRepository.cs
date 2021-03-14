using System;
using System.Threading.Tasks;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

using asp_mvc.Models;
using asp_mvc.Data;

namespace asp_mvc.DAL.Repositories
{
    public class CommentRepository : BaseRepository<Comment>, ICommentRepository
    {
        public CommentRepository(MSAContext dbContext)
        {
            model = dbContext.Comment;
            tableName = "Comment";
            context = dbContext;
        }

        public async Task<List<UserComment>> RetrieveAllUsersComments()
        {
            return await context.UserComment.FromSqlInterpolated($@"
            SELECT
                UserId,
                Email,
                Text,
                SentTime
            FROM
                ""Comment""
            INNER JOIN
                ""User""
                ON ""User"".Id = ""Comment"".UserId
            ORDER BY
                SentTime DESC
            ").ToListAsync();
        }

        public async override Task Update(Comment comment)
        {
            await context.Comment.FromSqlInterpolated($@"").FirstOrDefaultAsync<Comment>();
        }
    }
}