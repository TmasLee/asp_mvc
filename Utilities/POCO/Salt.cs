using Newtonsoft.Json;

namespace asp_mvc.Utilities.POCO
{
    [JsonObject("salt")]
    public class Salt
    {
        [JsonProperty("salt")]
        public string salt { get; set; }
    }
}