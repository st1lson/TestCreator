using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;

namespace TestCreator.Data.Models
{
    public class Test
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Name { get; set; }

        [AllowNull]
        public string Description { get; set; }

        [AllowNull]
        public string UserId { get; set; }

        public User User { get; set; }

        public List<Question> Questions { get; set; } = new();
    }
}
