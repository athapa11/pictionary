using Microsoft.OpenApi.Models;
using server.Hubs;
using server.Models;
using server.Services;

var builder = WebApplication.CreateBuilder(args);
var CLIENT_URL = builder.Configuration["VITE_CLIENT_URL"];
if (string.IsNullOrWhiteSpace(CLIENT_URL))
{
    Console.WriteLine("client url not set");
}

// Add services to the container.
builder.Services.AddSingleton<Session>();
builder.Services.AddSingleton<ISessionManager, SessionManager>();
builder.Services.AddSignalR().AddHubOptions<PictionaryHub>(options => {
    options.EnableDetailedErrors = true;
});

builder.Services.AddCors(options => 
{
  options.AddPolicy("AllowSpecificOrigins", policy =>
  {
    policy.WithOrigins(CLIENT_URL!)
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials();
  });
});


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.SwaggerDoc("v1", new OpenApiInfo
    {
        Version = "v1",
        Title = "Pictionary",
        Description = "A server to manage a pictionary game",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "Example Contact",
            Url = new Uri("https://example.com/contact")
        },
        License = new OpenApiLicense
        {
            Name = "Example License",
            Url = new Uri("https://example.com/license")
        }
    });
});


var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowSpecificOrigins");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options => {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty;
    });
}

app.MapHub<PictionaryHub>("/hub");
app.MapControllers();
app.Run();