using FluentValidation;
using TestCreator.WebAPI.Dtos.Auth.Inputs;
using TestCreator.WebAPI.Extensions;

namespace TestCreator.WebAPI.Validators.Auth
{
    public class LoginUserInputValidator : AbstractValidator<LoginUserInput>
    {
        public LoginUserInputValidator()
        {
            RuleFor(u => u.UserName)
                .NotEmpty()
                .WithMessage(ErrorMessages.EmptyUserName);

            RuleFor(u => u.Password)
                .NotEmpty()
                .WithMessage(ErrorMessages.EmptyPassword);
        }
    }
}
