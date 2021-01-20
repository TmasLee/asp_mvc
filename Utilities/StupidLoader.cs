using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace asp_mvc.Utilities
{
    public class StupidLoader
    {
        private Random _rand = new Random();

        public async Task LoadTime(int lower, int upper)
        {
            await Task.Delay(_rand.Next(lower, upper) * 1000);
        }

        public async Task LoadTime(int time)
        {
            await Task.Delay(_rand.Next(time, time) * 1000);
        }
    }
}
