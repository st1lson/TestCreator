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
        private readonly JwtTokenCreator _tokenCreator;

        public AuthController(UserManager<User> userManager, SignInManager<User> signInManager, JwtTokenCreator tokenCreator)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenCreator = tokenCreator;
        }

        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(RegisterUserInput input)
        {
            User user = new()
            {
                UserName = input.UserName,
                Email = input.Email
            };

            IdentityResult result = await _userManager.CreateAsync(user, input.Password);
            if (!result.Succeeded)
            {
                return BadRequest();
            }

            await _signInManager
                .PasswordSignInAsync(user, input.Password, isPersistent: false, lockoutOnFailure: false);

            var (token, _) = _tokenCreator.CreateAuthToken(user);

            return Ok(new LoginUserPayload(token, user.UserName));
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginUserInput input)
        {
            User user = _userManager.Users.FirstOrDefault(u => u.UserName == input.UserName);
            if (user is null)
            {
                return BadRequest();
            }

            SignInResult result = await _signInManager
                .PasswordSignInAsync(user, input.Password, isPersistent: false, lockoutOnFailure: false);

            if (!result.Succeeded)
            {
                return BadRequest();
            }

            var (token, _) = _tokenCreator.CreateAuthToken(user);

            return Ok(new LoginUserPayload(token, user.UserName));
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