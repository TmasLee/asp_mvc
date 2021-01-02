using System;
using System.Collections.Generic;
using System.Threading;

namespace asp_mvc.Utilities
{
    public class StupidLoader
    {
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
