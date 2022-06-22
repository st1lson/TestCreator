using System;
using AutoMapper;
using TestCreator.Data.Models;
using TestCreator.WebAPI.Data;

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