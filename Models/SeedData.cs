using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using asp_mvc.Data;

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
                var users = UserGenerator.GenerateUsers();
                foreach (User user in users)
                {
                    context.User.AddRange(user);
                }
                context.SaveChanges();
            }
        }
    }

    public static class UserGenerator
    {
        private static Random random = new Random();

        public static List<User> GenerateUsers()
        {
            List<string> names = new List<string>{
                "Kristofer Gidley",
                "Shaunna Raco",
                "Jayna Ginter",
                "Rashida Walkes",
                "Marvin Brathwaite",
                "Reyna Iles",
                "Norma Walker",
                "Soraya Edmondson",
                "Valene Staff",
                "Rivka Clayton",
                "Fermin Dches",
                "Krystyna Castillo",
                "Kimi Lollis",
                "Artie Bidwell",
                "Macie Couvillion",
                "Willene Lenton",
                "Sherika Coache",
                "Billye Sherburne",
                "Julia Stadler",
                "Valorie Lish",
                "Lelia Mcandrews",
                "Toby Raiford",
                "Cameron Winkleman",
                "Tasia Clink",
                "Brooks Campoverde",
                "Alejandra Scroggins",
                "Val Bird",
                "Elease Wolak",
                "Bobbye Green",
                "Mireya Southworth",
                "Lajuana Lawyer",
                "Lorina Dykstra",
                "Kotney Rendon",
                "Gema Alpaugh",
                "Ashli Carboni",
                "Darci Fujita",
                "Jae Rahman",
                "Vannessa Busby",
                "Jena Shimp",
                "Christene Wall",
                "Violet Reiss",
                "Dorathy Caro",
                "Suzann Mcpartland",
                "Benedit Guadalupe",
                "Sylvie China",
                "Altagracia Cottle",
                "Victor Lemke",
                "Galen Mcquire",
                "Antonio Lee",
                "Chris Treibs",
                "Dan Duman",
                "Lil Wayne",
                "Fitty sent",
                "Naruto Uzumaki",
                "Clyde Frog",
                "Luigi Dog",
                "Guy One",
                "Guy Two",
                "James Lee",
                "Jesus Christ",
                "Mike Tyson"
            };
            List<User> users = new List<User>(names.Count());

            for (int i = 0; i < names.Count(); i++)
            {
                try
                {
                    var name = names[i].Replace(" ", "_");
                    var splitName = name.Split("_");
                    users.Add(
                        new User {
                            Email = GenerateEmail(name),
                            Password = RandomString(8),
                            FirstName = splitName[0],
                            LastName = splitName[1]
                        }
                    );
                }
                catch
                {
                    continue;
                }
            }
            return users;
        }

        public static string GenerateEmail(string name)
        {
            string domain = "@gmail.com";
            string email = name + domain;
            return email;
        }

        public static string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, length)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        }
    }
}