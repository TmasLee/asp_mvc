using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using asp_mvc.Models;

namespace asp_mvc.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Produces("application/json")]
    public class ExercisesController : ControllerBase
    {
        private readonly ILogger<ExercisesController> _logger;
        public readonly IDateTime _dateTime;
        public ExercisesController(ILogger<ExercisesController> logger, IDateTime dateTime)
        {
            _logger = logger;
            _dateTime = dateTime;
        }

        [HttpGet("ServerTime")]
        public IDateTime ServerTime()
        {
            return this._dateTime;
        }

        [HttpGet("Data")]
        public async Task<IActionResult> Data()
        {
            return NoContent();
        }
    }
}