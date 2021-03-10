using Newtonsoft.Json;

namespace asp_mvc.Utilities.POCO
{
    [JsonObject("tokenManagement")]
    public class TokenManagement
    {
        [JsonProperty("secret")]
        public string Secret { get; set; }
        
        [JsonProperty("issuer")]
        public string Issuer { get; set; }
        
        [JsonProperty("audience")]
        public string Audience { get; set; }
        
        [JsonProperty("accessExpiration")]
        public int AccessExpiration { get; set; } = 480;
        
        [JsonProperty("refreshExpiration")]
        public int RefreshExpiration { get; set; } = 60;
        
    }
}