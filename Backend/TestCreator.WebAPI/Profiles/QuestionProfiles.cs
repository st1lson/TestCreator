using AutoMapper;
using System;
using TestCreator.Data.Models;
using TestCreator.WebAPI.Dtos.Questions;

namespace TestCreator.WebAPI.Profiles
{
    public class QuestionProfile : Profile
    {
        public QuestionProfile()
        {
            // Source -> target
            CreateMap<CreateQuestionInput, Question>()
                .ForMember(q => q.Id, options =>
                    options.MapFrom(_ => Guid.NewGuid().ToString()))
                .ForMember(q => q.Variants, options =>
                    options.MapFrom(qi => qi.Variants))
                .AfterMap((_, question) =>
                {
                    foreach (var variant in question.Variants)
                    {
                        variant.QuestionId = question.Id;
                    }
                });
        }
    }
}