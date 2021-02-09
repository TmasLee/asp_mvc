using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

namespace asp_mvc.Controllers
{
    public class IndexController : Controller
    {
        private readonly IWebHostEnvironment _env;
        public IndexController(IWebHostEnvironment env)
        {
            _env = env;
        }

        // Catch all Action - Serve default index.html from here
        public IActionResult Index()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "ClientApp/Client/public/index.html");
            return PhysicalFile(filePath, "text/html");
        }
    }
}
