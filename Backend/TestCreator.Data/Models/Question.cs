using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TestCreator.Data.Models
{
    public class Question
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Body { get; set; }

        public string TestId { get; set; }

        [JsonIgnore]
        public virtual Test Test { get; set; }

        public virtual List<Variant> Variants { get; set; }
    }
}
