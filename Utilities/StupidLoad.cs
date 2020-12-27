using System;
using System.Collections.Generic;
using System.Runtime;
using System.Threading;


namespace asp_mvc.Utilities
{
    public class StupidLoader
    {
        public String Authenticating { get; } = "Authenticating...";
        public String Connecting { get; } = "Connecting to services...";
        public String GettingDatas { get; } = "Getting user datas...";
        public String LostProgress { get; } = "Woah looks like we lost some progress, terrible UX. Better not log off... no really, I coded this to do this everytime you log in";
        private Random _rand = new Random();
        public void LoadTime(int lower, int upper)
        {
            Thread.Sleep(_rand.Next(lower, upper) * 1000);
        }
    }
}
