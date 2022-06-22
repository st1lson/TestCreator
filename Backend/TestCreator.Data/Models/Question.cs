using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace TestCreator.Data.Models
{
    public class Question
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Body { get; set; }

        [Required]
        public string TestId { get; set; }

        public List<Variant> Variants { get; set; }

        public Test Test { get; set; }
    }
}
