using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using TestCreator.Data.DbContexts;
using TestCreator.Data.Models;

namespace TestCreator.Services.Auth
{
    public class JwtRefreshTokenHandler
    {
        private readonly JwtTokenCreator _tokenCreator;
        private readonly RefreshTokensDbContext _context;

        public JwtRefreshTokenHandler(JwtTokenCreator tokenCreator, RefreshTokensDbContext context)
        {
            _tokenCreator = tokenCreator;
            _context = context;
        }

        public async Task<(string Token, DateTime Expires)> WriteIfExpiredAsync(User user)
        {
            RefreshToken currentToken = await _context.RefreshTokens.FirstOrDefaultAsync(t => t.UserId == user.Id);

            if (currentToken is not null)
            {
                if (currentToken.Expires > DateTime.Now)
                {
                    return (currentToken.Token, currentToken.Expires);
                }

                _context.RefreshTokens.Remove(currentToken);
            }

            var token = _tokenCreator.CreateAuthToken(user);

            RefreshToken newRefreshToken = new()
            {
                Id = Guid.NewGuid().ToString(),
                UserId = user.Id,
                Expires = token.Expires,
                Token = token.Token,
            };

            _context.RefreshTokens.Add(newRefreshToken);
            await _context.SaveChangesAsync();

            return token;
        }
    }
}
