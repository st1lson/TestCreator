using System.Collections.Generic;
using TestCreator.WebAPI.Dtos.Variants;

namespace TestCreator.WebAPI.Dtos.Questions
{
    public record CreateQuestionInput(string Body, List<CreateVariantInput> Variants);
}