using System;
using System.Collections.Generic;
using System.Runtime;
using System.Threading;


namespace asp_mvc.Utilities
{
    public class StupidLoader
    {
        public const string Registered = "Registered!";
        public const string Authenticating = "Authenticating...";
        public const string Connecting = "Connecting to services...";
        public const string LostProgress = "Woah looks like we lost some progress, terrible UX. Better not log off... no really, I coded this to do this everytime you log in";
        public const string GettingDatas = "Getting user datas...";
        private Random _rand = new Random();
        public void LoadTime(int lower, int upper)
        {
            Thread.Sleep(_rand.Next(lower, upper) * 1000);
        }

        public void LoadTime(int time)
        {
            Thread.Sleep(_rand.Next(time) * 1000);
        }
    }
}
