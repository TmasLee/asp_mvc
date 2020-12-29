
using System;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Linq;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;
using asp_mvc.Models;
using asp_mvc.DAL;

// Should UserRepository just be the manager implementing IUserRepository?
// AddSingleton vs AddTransient vs AddScoped
namespace asp_mvc.Data
{
    public class UserException : Exception
    {
        public UserException() : base() { }
        public UserException(string message) : base(message) { }
        public UserException(string message, Exception inner) : base(message, inner) { }
        protected UserException(System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }

    public class UserManager
    {
        private readonly IUserRepository _userRepo;
 
        public UserManager(IUserRepository userRepository)
        {
            _userRepo = userRepository;
        }

        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                return Regex.IsMatch(email,
                    @"^[^@\s]+@[^@\s]+\.[^@\s]+$",
                    RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250));
            }
            catch (RegexMatchTimeoutException)
            {
                return false;
            }
        }

        public User LogUserIn(User user)
        {
            var storedUser = _userRepo.RetrieveUserByEmail(user.Email);
            if (storedUser == null | !CheckPassword(user.Password, storedUser.Password))
                throw new UserException("Incorrect email or password!");
            return storedUser;
        }

        public bool VerifyEmail(string email)
        {
            if (!IsValidEmail(email))
                throw new UserException("Invalid email format");

            if (_userRepo.RetrieveUserByEmail(email) != null)
                throw new UserException("Email already in use!");

            return true;
        }

        public bool CheckPassword(string password, string storedPassword)
        {
            if (storedPassword != HashPassword(password))
                return false;
            return true;
        }

        public string HashPassword(string password)
        {
            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashedPassword;
        }

        public void AddUser(User newUser)
        {
            VerifyEmail(newUser.Email);
            newUser.Password = HashPassword(newUser.Password);
            _userRepo.CreateUser(newUser);
        }
    }
}
