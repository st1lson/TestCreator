using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using TestCreator.Data.Models;

namespace TestCreator.Data.DbContexts
{
    public class AppDbContext : IdentityDbContext<User>
    {
        public override DbSet<User> Users { get; set; }

        public DbSet<Test> Tests { get; set; }

        public DbSet<Question> Question { get; set; }

        public DbSet<Variant> Variants { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(
                    @"Server=(localdb)\mssqllocaldb;Database=test_creator;Trusted_connection=True;");
            }

            base.OnConfiguring(optionsBuilder);
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder
                .Entity<User>()
                .HasMany(u => u.Tests)
                .WithOne(t => t.User)
                .HasForeignKey(t => t.UserId);

            builder
                .Entity<Test>()
                .HasMany(t => t.Questions)
                .WithOne(q => q.Test)
                .HasForeignKey(q => q.TestId);

            builder
                .Entity<Question>()
                .HasMany(q => q.Variants)
                .WithOne(a => a.Question)
                .HasForeignKey(a => a.QuestionId);

            base.OnModelCreating(builder);
        }
    }
}
