using Microsoft.EntityFrameworkCore;
using api.Models; // <-- Change "YourNamespace" to match your EF Core namespace
using Microsoft.OpenApi.Models;
using api.Models; 

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Register your DbContext with the connection string named "DefaultConnection" from appsettings.json.
builder.Services.AddDbContext<MoviesDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add Swagger/OpenAPI generation so you can test endpoints.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Movies API", Version = "v1" });
});

var app = builder.Build();

// Enable Swagger UI in development (or everywhere if you prefer).
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "Movies API v1");
    });
}

// app.UseHttpsRedirection(); // Uncomment if you want HTTPS redirection in production

app.UseAuthorization();

app.MapControllers();

app.Run();
