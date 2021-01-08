using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Newtonsoft.Json;

namespace asp_mvc.Utilities.POCO
{
    public class TokenRequest
    {
        [Required] 
        [JsonProperty("email")]
        public string Email { get; set; }

        [Required] 
        [JsonProperty("password")]
        public string Password { get; set; }
    }
}