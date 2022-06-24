using System.Collections.Generic;
using TestCreator.WebAPI.Dtos.Variants.Inputs;

namespace TestCreator.WebAPI.Dtos.Questions.Inputs
{
    public record CreateQuestionInput(string Body, List<CreateVariantInput> Variants);
}