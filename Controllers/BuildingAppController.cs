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
    public class BuildingAppController : Controller
    {
        private readonly IWebHostEnvironment _env;

        public BuildingAppController(IWebHostEnvironment env)
        {
            _env = env;
        }

        [Route("[controller]")]
        public IActionResult BuildingAppIndex()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "ClientApp/Building/public/index.html");
            return PhysicalFile(filePath, "text/html");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

// Object model mismatch - OOP objects when objects only needed during run time? Maybe for data processing?
// For CRUD operations, DB model objects are enough?

// User - building - units - line - meters/meter types
// building type?, line type?
// building / line factories?

// Line abstract class?
// Line obj + utility col?
// Function to generate fake meter usage data?

// Design pattern maze example