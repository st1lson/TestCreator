using AutoMapper;
using System;
using TestCreator.Data.Models;
using TestCreator.WebAPI.Dtos.Variants;

namespace TestCreator.WebAPI.Profiles
{
    public class VariantProfile : Profile
    {
        public VariantProfile()
        {
            // Source -> target
            CreateMap<CreateVariantInput, Variant>()
                .ForMember(v => v.Id, options =>
                    options.MapFrom(_ => Guid.NewGuid().ToString()));
        }
    }
}
