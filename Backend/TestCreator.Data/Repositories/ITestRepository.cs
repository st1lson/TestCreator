using System.Collections.Generic;
using TestCreator.Data.Models;

namespace TestCreator.Data.Repositories
{
    public interface ITestRepository : IRepository<Test>
    {
        bool[] CheckAnswers(Test test, List<Variant> answers);
    }
}
