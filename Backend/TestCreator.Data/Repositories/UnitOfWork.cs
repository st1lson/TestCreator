using System;
using System.Threading.Tasks;
using TestCreator.Data.DbContexts;
using TestCreator.Data.Models;

namespace TestCreator.Data.Repositories
{
    public class UnitOfWork : IDisposable
    {
        public GenericRepository<User> UserRepository { get; }

        public GenericRepository<Test> TestRepository { get; }

        private readonly AppDbContext _context;

        public UnitOfWork(AppDbContext context)
        {
            UserRepository = new GenericRepository<User>(context);
            TestRepository = new GenericRepository<Test>(context);
            _context = context;
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        private bool _disposed = false;

        protected virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
            }
            _disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
