using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace TestCreator.Data.Models
{
    public class User : IdentityUser
    {
        public List<Test> Tests { get; set; } = new();
    }
}
