using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;

namespace TestCreator.Data.Repositories
{
    public interface IRepository<TEntity> where TEntity : class
    {
        IEnumerable<TEntity> Get(
            Expression<Func<TEntity, bool>> filter = null,
            Func<IQueryable<TEntity>, IOrderedQueryable<TEntity>> orderBy = null);

        TEntity GetById(string id);

        TEntity Insert(TEntity entity);

        TEntity Update(TEntity entity);

        TEntity Delete(string id);

        TEntity Delete(TEntity entityToDelete);
    }
}
