using System.Collections.Generic;
using TestCreator.WebAPI.Dtos.Questions.Inputs;

namespace TestCreator.WebAPI.Dtos.Tests.Inputs
{
    public record CreateTestInput(string Name, string Description, List<CreateQuestionInput> Questions);
}