using Microsoft.EntityFrameworkCore;
using TestCreator.Data.Models;

namespace TestCreator.Data.DbContexts
{
    public class RefreshTokensDbContext : DbContext
    {
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        public RefreshTokensDbContext(DbContextOptions options) : base(options)
        {

        }
    }
}
