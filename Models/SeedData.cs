using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using asp_mvc.Data;
using System;
using System.Linq;

namespace asp_mvc.Models
{
    public static class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new MSAContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<MSAContext>>()))
            {
                if (context.User.Any())
                {
                    return;   // DB has been seeded
                }
                context.User.AddRange(
                    new User{
                        Email = "test@test.com",
                        Password = "hashedpassword",
                        FirstName = "Test",
                        LastName = "E"
                    }
                );
                context.SaveChanges();
            }
        }
    }
}