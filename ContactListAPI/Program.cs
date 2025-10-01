using ContactListAPI.Middleware;
using ContactListAPI.Models;
using Microsoft.EntityFrameworkCore;

var  policyName = "_myAllowSpecificOrigins";
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers(); //Add Controllers services
builder.Services.AddScoped<ContactListAPI.Services.ContactService>();
builder.Services.AddDbContext<ContactDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var allowedOrigins = builder.Configuration.GetValue<string>("allowedOrigins")!.Split(',');
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: policyName,
                      builder =>
                      {
                          builder
                            .WithOrigins(allowedOrigins)
                            .AllowAnyMethod()
                            .AllowAnyHeader();
                      });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseCors(policyName);
}

app.UseExceptionHandling();
app.UseHttpsRedirection();

//Map the controllers so that we can use the ones we create
app.UseStaticFiles();                 // 1) serve Angular from wwwroot
app.MapControllers();
app.MapFallbackToFile("index.html");  // 3) SPA fallback

try
{
    app.Run();
}
catch (Exception ex)
{
    File.WriteAllText(Path.Combine(AppContext.BaseDirectory, "startup-error.txt"), ex.ToString());
    throw;
}
