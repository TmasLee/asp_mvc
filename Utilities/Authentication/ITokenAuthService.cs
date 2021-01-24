using System.Threading.Tasks;

using asp_mvc.Utilities.POCO;

namespace asp_mvc.Utilities.Authentication
{
    public interface ITokenAuthService
    {
        Task<bool> IsAuthenticated(TokenRequest request);
        void GenerateCsrfToken();
        void DeleteCookies();
    }
}
