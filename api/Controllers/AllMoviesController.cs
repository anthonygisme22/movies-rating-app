using Microsoft.AspNetCore.Mvc;
using api.Models; // Make sure this matches your DbContext namespace
using System.Linq;

namespace api.Controllers
{
	[ApiController]
	[Route("api/[controller]")]
	public class AllMoviesController : ControllerBase
	{
		private readonly MoviesDbContext _context;

		public AllMoviesController(MoviesDbContext context)
		{
			_context = context;
		}

		// GET: api/allmovies
		[HttpGet]
		public IActionResult GetAllMovies()
		{
			// Query the AllMovies table
			var movies = _context.AllMovies.ToList();

			// Return the list of movies as JSON
			return Ok(movies);
		}
	}
}
