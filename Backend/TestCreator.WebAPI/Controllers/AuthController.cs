using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Threading.Tasks;
using TestCreator.Data.Models;
using TestCreator.Services.Auth;
using TestCreator.WebAPI.Dtos.Auth.Inputs;
using TestCreator.WebAPI.Dtos.Auth.Payloads;
using TestCreator.WebAPI.Extensions;
using TestCreator.WebAPI.Validators.Auth;
using SignInResult = Microsoft.AspNetCore.Identity.SignInResult;

namespace TestCreator.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class AuthController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly JwtRefreshTokenHandler _tokenHandler;
        private readonly JwtTokenCreator _tokenCreator;

        public AuthController(
            UserManager<User> userManager,
            SignInManager<User> signInManager,
            JwtRefreshTokenHandler tokenHandler,
            JwtTokenCreator tokenCreator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenHandler = tokenHandler;
            _tokenCreator = tokenCreator;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserInput input)
        {
            RegisterUserInputValidator validator = new();
            ValidationResult validationResult = await validator.ValidateAsync(input);

            if (!validationResult.IsValid)
            {
                return BadRequest(new { errors = validationResult.Errors });
            }

            User user = new()
            {
                UserName = input.UserName,
                Email = input.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, input.Password);
            if (!result.Succeeded)
            {
                return BadRequest(new { errors = new { ErrorMessages.InvalidCredentials } });
            }

            await _signInManager
                .PasswordSignInAsync(user, input.Password, isPersistent: false, lockoutOnFailure: false);

            var (token, _) = _tokenCreator.CreateAuthToken(user);
            var (refreshToken, _) = await _tokenHandler.WriteIfExpiredAsync(user).ConfigureAwait(false);

            return Ok(new LoginUserPayload(token, refreshToken, user.UserName));
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserInput input)
        {
            LoginUserInputValidator validator = new();
            ValidationResult validationResult = await validator.ValidateAsync(input);

            if (!validationResult.IsValid)
            {
                return BadRequest(new { errors = validationResult.Errors });
            }

            User user = _userManager.Users.FirstOrDefault(u => u.UserName == input.UserName);
            if (user is null)
            {
                return BadRequest(new { errors = ErrorMessages.UserExists });
            }

            SignInResult result = await _signInManager
                .PasswordSignInAsync(user, input.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return BadRequest(new { error = ErrorMessages.InvalidCredentials });
            }

            var (token, _) = _tokenCreator.CreateAuthToken(user);
            var (refreshToken, _) = await _tokenHandler.WriteIfExpiredAsync(user).ConfigureAwait(false);

            return Ok(new LoginUserPayload(token, refreshToken, user.UserName));
        }

        [HttpPost]
        [Route("logout")]
        [Authorize(Policy = "Auth")]
        public async Task<IActionResult> Logout()
        {
            try
            {
                await _signInManager.SignOutAsync().ConfigureAwait(false);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }

            return Ok();
        }
    }
}