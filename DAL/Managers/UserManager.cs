using System;
using System.Threading.Tasks;
using System.Text;
using System.Text.RegularExpressions;
using System.Collections.Generic;
using System.Security.Cryptography;
using Microsoft.Extensions.Options;
using Microsoft.AspNetCore.Cryptography.KeyDerivation;

using asp_mvc.Models;
using asp_mvc.Utilities.POCO;

namespace asp_mvc.DAL.Managers
{
    public class UserException : Exception
    {
        public UserException() : base() { }
        public UserException(string message) : base(message) { }
        public UserException(string message, Exception inner) : base(message, inner) { }
        protected UserException(System.Runtime.Serialization.SerializationInfo info,
            System.Runtime.Serialization.StreamingContext context) : base(info, context) { }
    }

    public class UserManager : IUserManager
    {
        private readonly IUserRepository _userRepo;
        private static byte[] _salt;

        public UserManager(IUserRepository userRepository, IOptions<Salt> salt)
        {
            _salt = Encoding.ASCII.GetBytes(salt.Value.salt);
            _userRepo = userRepository;
        }

        public async Task<bool> IsValidUser(string email, string password)
        {
            var storedUser = await _userRepo.Retrieve(email);

            if (storedUser == null)
            {
                return false;
            }

            if (!CheckPassword(password, storedUser.Password))
            {
                return false;
            }

            return true;
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

        public async Task VerifyEmail(string email)
        {
            if (!IsValidEmail(email))
                throw new UserException("Invalid email format");

            if (await _userRepo.Retrieve(email) != null)
                throw new UserException("Email already in use!");
        }

        public bool CheckPassword(string password, string storedPassword)
        {
            var hashedPassword = HashPassword(password);

            if (storedPassword != hashedPassword)
                return false;

            return true;
        }

        public string HashPassword(string password)
        {
            // derive a 256-bit subkey (use HMACSHA1 with 10,000 iterations)
            string hashedPassword = Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password,
                salt: _salt,
                prf: KeyDerivationPrf.HMACSHA1,
                iterationCount: 10000,
                numBytesRequested: 256 / 8));

            return hashedPassword;
        }

        public byte[] GenerateSalt()
        {
            // generate a 128-bit salt using a secure PRNG
            byte[] salt = new byte[128 / 8];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            return salt;
        }

        public async Task AddUser(User newUser)
        {
            await VerifyEmail(newUser.Email);

            var hashedPassword = HashPassword(newUser.Password);
            string saltString = Convert.ToBase64String(_salt);

            newUser.Password = hashedPassword;
            await _userRepo.Create(newUser);
        }
    }
}
