using System;
using System.IO;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;

namespace asp_mvc.Controllers
{
    public class IndexController : Controller
    {
        private readonly IWebHostEnvironment _env;
        public readonly IDateTime _dateTime;
        public IndexController(IWebHostEnvironment env, IDateTime dateTime)
        {
            _env = env;
            _dateTime = dateTime;
        }

        // Catch all Action - Serve default index.html from here
        public IActionResult Index()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "ClientApp/Client/public/index.html");
            return PhysicalFile(filePath, "text/html");
        }

        [HttpGet("[controller]/Exercises/ServerTime")]
        [Produces("application/json")]
        public IDateTime ServerTime()
        {
            return this._dateTime;
        }
    }
}
