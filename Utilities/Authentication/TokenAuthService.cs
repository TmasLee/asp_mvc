using System;
using System.Threading.Tasks;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Antiforgery;

using asp_mvc.Utilities.POCO;
using asp_mvc.DAL.Managers;

namespace asp_mvc.Utilities.Authentication
{
    public class TokenAuthService : ITokenAuthService
    {
        private readonly IUserManager _userMgr;
        private readonly TokenManagement _tokenManagement;
        private readonly IAntiforgery _antiForgery;
        private readonly HttpContext _context;

        public TokenAuthService(IUserManager userMgr, IOptions<TokenManagement> tokenManagement, IHttpContextAccessor httpContextAccessor, IAntiforgery antiforgery)
        {
            _userMgr = userMgr;
            _tokenManagement = tokenManagement.Value;
            _antiForgery = antiforgery;
            _context = httpContextAccessor.HttpContext;
        }

        public async Task<bool> IsAuthenticated(TokenRequest request)
        {
            string authToken = string.Empty;
            bool isValidUser = await _userMgr.IsValidUser(request.Email, request.Password);
            if (!isValidUser) return false;

            // Generate new JWT from claims
            var claim = new[]
            {
                new Claim(ClaimTypes.Email, request.Email)
            };
            var encodedSecret = Encoding.UTF8.GetBytes(_tokenManagement.Secret);
            var key = new SymmetricSecurityKey(encodedSecret);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var jwtToken = new JwtSecurityToken(
                _tokenManagement.Issuer,
                _tokenManagement.Audience,
                claim,
                expires: DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                signingCredentials: credentials
            );

            authToken = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            CookieOptions option = new CookieOptions()
            {
                HttpOnly = true,
                Secure = true
            };

            // Store JWT in HttpOnly cookie
            _context.Response.Cookies.Append("auth-token", authToken, option);

            return true;
        }

        public void GenerateCsrfToken()
        {
            // Generate CSRF token
            var csrfToken = _antiForgery.GetAndStoreTokens(_context).RequestToken;

            // Store CSRF token in non-HttpOnly cookie - CSRF attacker would need access to cookie value to attach in header
            _context.Response.Cookies.Append("csrf-token", csrfToken, new Microsoft.AspNetCore.Http.CookieOptions
            {
                HttpOnly = false
            });
        }

        public void DeleteCookies()
        {
            foreach (var cookie in _context.Request.Cookies.Keys)
            {
                _context.Response.Cookies.Delete(cookie);
            }
        }
    }
}