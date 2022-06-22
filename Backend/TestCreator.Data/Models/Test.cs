using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics.CodeAnalysis;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public virtual User User { get; set; }

        public virtual List<Question> Questions { get; set; } = new();
    }
}
