using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace TestCreator.Data.Models
{
    public class Variant
    {
        [Key]
        public string Id { get; set; }

        [Required]
        public string Body { get; set; }

        [Required]
        public bool IsAnswer { get; set; }

        public string QuestionId { get; set; }

        [JsonIgnore]
        public virtual Question Question { get; set; }
    }
}
