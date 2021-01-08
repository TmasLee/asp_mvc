using System;
using System.Text;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;

using asp_mvc.Utilities.POCO;
using asp_mvc.DAL.Managers;

namespace asp_mvc.Utilities.Authentication
{
    public class TokenAuthService : ITokenAuthService
    {
        private readonly IUserManager _userMgr;
        private readonly TokenManagement _tokenManagement;

        public TokenAuthService(IUserManager userMgr, IOptions<TokenManagement> tokenManagement)
        {
            _userMgr = userMgr;
            _tokenManagement = tokenManagement.Value;
        }

        public bool IsAuthenticated(TokenRequest request, out string token)
        {
            token = string.Empty;
            if (!_userMgr.IsValidUser(request.Email, request.Password)) return false;
            
            var claim = new[]
            {
                new Claim(ClaimTypes.Email, request.Email)
            };
            var x = Encoding.UTF8.GetBytes(_tokenManagement.Secret);
            var key = new SymmetricSecurityKey(x);
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var jwtToken = new JwtSecurityToken(
                _tokenManagement.Issuer,
                _tokenManagement.Audience,
                claim,
                expires:DateTime.Now.AddMinutes(_tokenManagement.AccessExpiration),
                signingCredentials: credentials
            );

            token = new JwtSecurityTokenHandler().WriteToken(jwtToken);

            return true;
        }
    }
}