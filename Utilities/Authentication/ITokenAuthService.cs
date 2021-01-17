using asp_mvc.Utilities.POCO;

namespace asp_mvc.Utilities.Authentication
{
    public interface ITokenAuthService
    {
        bool IsAuthenticated(TokenRequest request, out string token);
        void GenerateCsrfToken();
    }
}
