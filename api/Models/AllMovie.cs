using System;
using System.Collections.Generic;

namespace api.Models;

public partial class AllMovie
{
    public int MovieId { get; set; }

    public string Title { get; set; } = null!;

    public int? Year { get; set; }

    public decimal? Rating { get; set; }

    public decimal? BakedScale { get; set; }
}
