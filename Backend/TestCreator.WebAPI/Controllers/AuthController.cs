using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TestCreator.Data.Models;
using TestCreator.Services.Auth;
using TestCreator.WebAPI.Dtos.Auth.Inputs;
using TestCreator.WebAPI.Dtos.Auth.Payloads;

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

            return Ok(new RegisterUserPayload(token, user.UserName));
        }
    }
}