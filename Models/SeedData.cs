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
            List<User> users = new List<User>(100);
            for (int i = 0; i < 100; i++)
            {
                try
                {
                    users.Add(
                        new User {
                            Email = GenerateEmail(),
                            Password = RandomString(8),
                            FirstName = RandomString(3),
                            LastName = RandomString(3)
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

        public static string GenerateEmail()
        {
            string domain = "@" + RandomString(3) + ".com";
            string email = RandomString(3) + domain;
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