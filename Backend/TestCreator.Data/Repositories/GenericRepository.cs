using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using TestCreator.Data.DbContexts;

namespace TestCreator.Data.Repositories
{
    public class GenericRepository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected AppDbContext Context { get; }

        protected DbSet<TEntity> DbSet { get; }

        public GenericRepository(AppDbContext context)
        {
            Context = context;
            DbSet = context.Set<TEntity>();
        }

        public virtual IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null)
        {
            IQueryable<TEntity> query = DbSet;

            if (filter is not null)
            {
                query = query.Where(filter);
            }

            return orderBy is not null ? orderBy(query).ToList() : query.ToList();
        }

        public virtual TEntity GetById(string id)
        {
            return DbSet.Find(id);
        }

        public virtual TEntity Insert(TEntity entity)
        {
            return DbSet.Add(entity).Entity;
        }

        public virtual TEntity Update(TEntity entity)
        {
            return DbSet.Update(entity).Entity;
        }

        public virtual TEntity Delete(string id)
        {
            TEntity entity = GetById(id);
            return Delete(entity);
        }

        public virtual TEntity Delete(TEntity entityToDelete)
        {
            if (Context.Entry(entityToDelete).State == EntityState.Detached)
            {
                DbSet.Attach(entityToDelete);
            }

            return DbSet.Remove(entityToDelete).Entity;
        }
    }
}
