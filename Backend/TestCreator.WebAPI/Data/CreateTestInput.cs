using System.Collections.Generic;
using TestCreator.Data.Models;

namespace TestCreator.WebAPI.Data
{
    public record CreateTestInput(string Name, string Description, List<Question> Questions);
}