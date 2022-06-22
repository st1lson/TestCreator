using System.Collections.Generic;
using TestCreator.Data.DbContexts;
using TestCreator.Data.Models;

namespace TestCreator.Data.Repositories
{
    internal class TestRepository : GenericRepository<Test>, ITestRepository
    {
        public TestRepository(AppDbContext context) : base(context)
        {

        }

        public bool[] CheckAnswers(Test test, List<Variant> answers)
        {
            bool[] results = new bool[answers.Count - 1];
            for (var i = 0; i < test.Questions.Count; i++)
            {
                Question question = test.Questions[i];
                foreach (Variant variant in question.Variants)
                {
                    foreach (var answer in answers)
                    {
                        if (answer.Id != variant.Id)
                        {
                            continue;
                        }

                        if (variant.IsAnswer)
                        {
                            results[i] = true;
                        }
                        else
                        {
                            results[i] = false;
                        }

                        break;
                    }
                }
            }

            return results;
        }
    }
}
