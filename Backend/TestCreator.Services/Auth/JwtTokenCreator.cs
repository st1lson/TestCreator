using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace TestCreator.Services.Auth
{
    public class JwtTokenCreator
    {
        private readonly IConfiguration _configuration;

        public JwtTokenCreator(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public (string Token, DateTime Expires) CreateAuthToken(IdentityUser user)
        {
            Claim[] claims =
            {
                new(JwtRegisteredClaimNames.Sub, user.Id),
                new(JwtRegisteredClaimNames.Typ, "Auth"),
            };

            string signingKeyPhrase = _configuration["SigningKeyPhrase"];
            SymmetricSecurityKey signingKey = new(Encoding.UTF8.GetBytes(signingKeyPhrase));
            SigningCredentials credentials = new(signingKey, SecurityAlgorithms.HmacSha256);

            DateTime expires = DateTime.Now.AddMinutes(20);

            JwtSecurityToken token = new(
                signingCredentials: credentials,
                claims: claims,
                expires: expires);

            return (new JwtSecurityTokenHandler().WriteToken(token), expires);
        }
    }
}
