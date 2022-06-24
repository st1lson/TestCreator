using FluentValidation;
using TestCreator.WebAPI.Dtos.Auth.Inputs;
using TestCreator.WebAPI.Extensions;

namespace TestCreator.WebAPI.Validators.Auth
{
    public class RegisterUserInputValidator : AbstractValidator<RegisterUserInput>
    {
        public RegisterUserInputValidator()
        {
            RuleFor(u => u.Email)
                .NotEmpty()
                .WithMessage(ErrorMessages.EmptyEmail);

            RuleFor(u => u.UserName)
                .NotEmpty()
                .WithMessage(ErrorMessages.EmptyUserName);

            RuleFor(u => u.Password)
                .NotEmpty()
                .WithMessage(ErrorMessages.EmptyPassword);
        }
    }
}
