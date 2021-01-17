using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace asp_mvc.Utilities
{
    public class ApiAntiforgeryTokenAuthorizationFilter : Attribute, IAsyncAuthorizationFilter
    {
        private readonly IAntiforgery _antiforgery;
        public ApiAntiforgeryTokenAuthorizationFilter(IAntiforgery antiforgery) => _antiforgery = antiforgery;

        public async Task OnAuthorizationAsync(AuthorizationFilterContext context)
        {
            if (!context.IsEffectivePolicy(this))
            {
                return;
            }

            try
            {
                await _antiforgery.ValidateRequestAsync(context.HttpContext);
            }
            catch (AntiforgeryValidationException exception)
            {
                context.Result = new StatusCodeResult(StatusCodes.Status403Forbidden);
            }
        }
    }
}
