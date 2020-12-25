using System.ComponentModel.DataAnnotations;
using System.Collections.Generic;

namespace asp_mvc.Models
{
    public class User
    {
        [Key]
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Password { get; set; }
        public ICollection<Building> Buildings { get; set; }
    }
}