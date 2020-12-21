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
                if (context.Buildings.Any())
                {
                    Console.WriteLine("XD");
                    return;   // DB has been seeded
                }
                Console.WriteLine("XDs");
                context.Buildings.AddRange(
                    new Building
                    {
                        Id = 0
                    },

                    new Building
                    {
                        Id = 1
                    }
                );
                context.SaveChanges();
            }
        }
    }
}