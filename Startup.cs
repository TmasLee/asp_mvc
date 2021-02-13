using System;
using System.Text;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.FileProviders;
using Newtonsoft.Json;

using asp_mvc.Data;
using asp_mvc.DAL;
using asp_mvc.DAL.Managers;
using asp_mvc.Utilities;
using asp_mvc.Utilities.POCO;
using asp_mvc.Utilities.Authentication;

namespace asp_mvc
{
    public class Startup
    {
        public IConfiguration Configuration { get; }
        private readonly IWebHostEnvironment _env;

        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            _env = env;
        }

        // This method gets called by the runtime. Use this method to inject services to the container
        public void ConfigureServices(IServiceCollection services)
        {
            if (_env.IsProduction())
            {
                var secretsMgr = new SecretsManager();

                string dbConnectionString = secretsMgr.GetDbConnectionString();

                services.AddDbContext<MSAContext>(options =>
                    options.UseSqlServer(dbConnectionString));

                dynamic token = JsonConvert.DeserializeObject(secretsMgr.GetSecret("astronautsloth/jwt"));
                string tokenSecret = token.secret;
                string tokenIssuer = token.Issuer;
                string tokenAudience = token.audience;

                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Cookies["auth-token"];
                            return Task.CompletedTask;
                        },
                    };
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey =  new SymmetricSecurityKey(Encoding.ASCII.GetBytes(tokenSecret)),
                        ValidIssuer = tokenIssuer,
                        ValidAudience = tokenAudience,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            }
            else
            {
                services.AddDbContext<MSAContext>(options =>
                    options.UseSqlServer(Configuration["MultiSpaApp:ConnectionString"]));

                services.AddDatabaseDeveloperPageExceptionFilter();

                services.Configure<TokenManagement>(Configuration.GetSection("tokenManagement"));
                var token = Configuration.GetSection("tokenManagement").Get<TokenManagement>();
                services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
                {
                    options.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            context.Token = context.Request.Cookies["auth-token"];
                            return Task.CompletedTask;
                        },
                    };
                    options.RequireHttpsMetadata = false;
                    options.SaveToken = true;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey =  new SymmetricSecurityKey(Encoding.ASCII.GetBytes(token.Secret)),
                        ValidIssuer = token.Issuer,
                        ValidAudience = token.Audience,
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
            }

            // CSRF token service
            services.AddAntiforgery(options =>
            {
                options.HeaderName = "csrf-token";
            });
            services.AddScoped<ApiAntiforgeryTokenAuthorizationFilter>(); // Custom CSRF token validation attribute - Antiforgery not supported for APIs with no views
            services.AddScoped<ITokenAuthService, TokenAuthService>();
            services.AddScoped<IUserRepository, UserRepository>(); // Test UserRepository with fake dependencies
            services.AddScoped<IFriendshipRepository, FriendshipRepository>();
            services.AddScoped<IUserManager, UserManager>();
            services.AddScoped<IFriendshipManager, FriendshipManager>();
            services.AddScoped<SecretsManager>();
            services.AddTransient<StupidLoader>();

            services.AddControllers();
            services.AddHttpContextAccessor();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (_env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Index/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            // Serve JS bundles from here
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(_env.ContentRootPath, "ClientApp/dist")
                ),
                RequestPath = "/dist"
            });

            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(
                    Path.Combine(_env.ContentRootPath, "ClientApp/assets")
                ),
                RequestPath = "/assets"
            });


            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
                endpoints.MapFallbackToController("Index", "Index");
            });
        }
    }
}
