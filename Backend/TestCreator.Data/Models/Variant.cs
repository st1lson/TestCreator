using System.ComponentModel.DataAnnotations;

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

        [Required]
        public string QuestionId { get; set; }

        public Question Question { get; set; }
    }
}
