using System.Collections.Generic;

namespace asp_mvc.Models
{
    public enum Grade
    {
        A, B, C, D, F
    }

    public class Building
    {
        public int Id { get; set; }

        public ICollection<Line> Lines { get; set; }

    }
}