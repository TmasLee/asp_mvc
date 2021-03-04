using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;

namespace asp_mvc.Utilities.Authentication{
    public class EmailBasedUserIdProvider : IUserIdProvider
    {
        public virtual string GetUserId(HubConnectionContext connection)
        {
            return connection.User?.FindFirst(ClaimTypes.Email)?.Value;
        }
    }
}