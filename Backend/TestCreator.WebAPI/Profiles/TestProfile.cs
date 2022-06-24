using AutoMapper;
using System;
using TestCreator.Data.Models;
using TestCreator.WebAPI.Dtos.Tests.Inputs;

namespace TestCreator.WebAPI.Profiles
{
    public class TestProfile : Profile
    {
        public TestProfile()
        {
            // Source -> target
            CreateMap<CreateTestInput, Test>()
                .ForMember(t => t.Id, options =>
                    options.MapFrom(_ => Guid.NewGuid().ToString()))
                .ForMember(t => t.Questions, options =>
                    options.MapFrom(ti => ti.Questions))
                .AfterMap((_, test) =>
                {
                    foreach (var question in test.Questions)
                    {
                        question.TestId = test.Id;
                    }
                });
        }
    }
}