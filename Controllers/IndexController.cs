﻿using System;
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

        public IndexController(IWebHostEnvironment env)
        {
            _env = env;
        }

        public IActionResult Index()
        {
            var filePath = Path.Combine(_env.ContentRootPath, "ClientApp/public/index.html");
            return PhysicalFile(filePath, "text/html");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
