using AutoMapper;
using System;
using TestCreator.Data.Models;
using TestCreator.WebAPI.Dtos.Tests;

namespace TestCreator.WebAPI.Profiles
{
    public class TestProfile : Profile
    {
        public TestProfile()
        {
            // Source -> target
            CreateMap<CreateTestInput, Test>()
                .ForMember(t => t.Id, options =>
                    options.MapFrom(_ => Guid.NewGuid().ToString()));
        }
    }
}