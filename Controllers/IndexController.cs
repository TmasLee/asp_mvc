using System;
using System.IO;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using asp_mvc.Models;

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

        [HttpGet("Data")]
        public async Task<IActionResult> Data()
        {
            return NoContent();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
