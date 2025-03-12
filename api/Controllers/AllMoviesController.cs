using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Models; // Matches the namespace in your DbContext and entity classes
using System.Linq;
using System.Threading.Tasks;

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
		public async Task<IActionResult> GetAllMovies()
		{
			var movies = await _context.AllMovies.ToListAsync();
			return Ok(movies);
		}

		// GET: api/allmovies/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetMovieById(int id)
		{
			var movie = await _context.AllMovies.FindAsync(id);
			if (movie == null)
			{
				return NotFound($"No movie found with ID = {id}");
			}
			return Ok(movie);
		}

		// POST: api/allmovies
		[HttpPost]
		public async Task<IActionResult> CreateMovie([FromBody] AllMovie newMovie)
		{
			if (newMovie == null)
			{
				return BadRequest("Movie data is null.");
			}

			// Add the new movie to the DbContext
			_context.AllMovies.Add(newMovie);
			await _context.SaveChangesAsync();

			// Return the newly created movie with status code 201
			return CreatedAtAction(nameof(GetMovieById), new { id = newMovie.MovieId }, newMovie);
		}

		// PUT: api/allmovies/5
		[HttpPut("{id}")]
		public async Task<IActionResult> UpdateMovie(int id, [FromBody] AllMovie updatedMovie)
		{
			if (updatedMovie == null || updatedMovie.MovieId != id)
			{
				return BadRequest("Movie ID mismatch or data is null.");
			}

			var existingMovie = await _context.AllMovies.FindAsync(id);
			if (existingMovie == null)
			{
				return NotFound($"No movie found with ID = {id}");
			}

			// Update properties here
			existingMovie.Title = updatedMovie.Title;
			existingMovie.Rating = updatedMovie.Rating;
			existingMovie.BakedScale = updatedMovie.BakedScale;
			// ... set other properties as needed ...

			_context.Entry(existingMovie).State = EntityState.Modified;
			await _context.SaveChangesAsync();

			return NoContent();
		}

		// DELETE: api/allmovies/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteMovie(int id)
		{
			var movie = await _context.AllMovies.FindAsync(id);
			if (movie == null)
			{
				return NotFound($"No movie found with ID = {id}");
			}

			_context.AllMovies.Remove(movie);
			await _context.SaveChangesAsync();

			return NoContent();
		}
	}
}
