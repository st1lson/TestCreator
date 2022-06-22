using System.Collections.Generic;
using TestCreator.Data.Models;

namespace TestCreator.WebAPI.Dtos.Tests
{
    public record CreateTestInput(string Name, string Description, List<Question> Questions);
}