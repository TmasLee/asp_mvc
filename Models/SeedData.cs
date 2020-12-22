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
            using (var context = new BuildingContext(
                serviceProvider.GetRequiredService<
                    DbContextOptions<BuildingContext>>()))
            {
                if (context.Building.Any())
                {
                    return;   // DB has been seeded
                }
                context.Building.AddRange(
                    new Building{}
                );
                context.SaveChanges();
            }
        }
    }
}