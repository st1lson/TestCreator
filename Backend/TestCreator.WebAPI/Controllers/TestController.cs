using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TestCreator.Data.Models;
using TestCreator.Data.Repositories;
using TestCreator.WebAPI.Dtos.Tests;

namespace TestCreator.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]
    public class TestController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly UserManager<User> _userManager;
        private readonly IMapper _mapper;

        public TestController(UnitOfWork unitOfWork, UserManager<User> userManager, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _userManager = userManager;
            _mapper = mapper;
        }

        [HttpGet]
        [Authorize(Policy = "Auth")]
        public IActionResult Get([FromServices] IHttpContextAccessor accessor)
        {
            string userId = accessor.HttpContext!.User.Claims.First().Value;
            IEnumerable<Test> tests = _unitOfWork.TestRepository.Get(t => t.UserId == userId);

            return Ok(tests);
        }

        [HttpGet("{id}")]
        [Authorize(Policy = "Auth")]
        public IActionResult GetById([FromServices] IHttpContextAccessor accessor, string id)
        {
            string userId = accessor.HttpContext!.User.Claims.First().Value;
            Test test = _unitOfWork.TestRepository.GetById(id);
            if (test.UserId != userId)
            {
                return BadRequest();
            }

            return Ok(test);
        }

        [HttpPost]
        [Authorize(Policy = "Auth")]
        public async Task<IActionResult> Create([FromServices] IHttpContextAccessor accessor, CreateTestInput input)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            Test newTest = _mapper.Map<Test>(input);
            string userId = accessor.HttpContext!.User.Claims.First().Value;
            newTest.UserId = userId;

            Test createdTest = _unitOfWork.TestRepository.Insert(newTest);
            await _unitOfWork.SaveChangesAsync();

            return Ok(createdTest);
        }
    }
}
