using System.Collections.Generic;
using TestCreator.WebAPI.Dtos.Questions;

namespace TestCreator.WebAPI.Dtos.Tests
{
    public record CreateTestInput(string Name, string Description, List<CreateQuestionInput> Questions);
}