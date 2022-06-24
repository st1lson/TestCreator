using FluentValidation;
using TestCreator.WebAPI.Dtos.Tests.Inputs;
using TestCreator.WebAPI.Extensions;

namespace TestCreator.WebAPI.Validators.Tests
{
    public class CreateTestInputValidator : AbstractValidator<CreateTestInput>
    {
        public CreateTestInputValidator()
        {
            RuleFor(t => t.Questions)
                .NotEmpty()
                .WithMessage(ErrorMessages.EmptyQuestions);

            RuleFor(t => t.Name)
                .NotEmpty()
                .WithMessage(ErrorMessages.EmptyTestName);
        }
    }
}
