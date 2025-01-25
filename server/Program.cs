using server.Data;
using server.Interfaces;
using server.Models;
using server.Repository;
using server.Service;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using server.Hubs;


var builder = WebApplication.CreateBuilder(args);


// Add services to the container.
builder.Services.AddCors(options => 
{
  options.AddPolicy("AllowSpecificOrigins", policy =>
  {
    policy.WithOrigins("http://localhost:5173")
      .AllowAnyHeader()
      .AllowAnyMethod()
      .AllowCredentials();
  });
});

builder.Services.AddSignalR(options => { options.EnableDetailedErrors = true; });
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(option => 
{
  option.SwaggerDoc("v1", new OpenApiInfo { Title = "Demo API", Version = "v1" });
  option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
  {
    In = ParameterLocation.Header,
    Description = "Please enter a valid token",
    Name = "Authorization",
    Type = SecuritySchemeType.Http,
    BearerFormat = "JWT",
    Scheme = "Bearer"
  });
  option.AddSecurityRequirement(new OpenApiSecurityRequirement
  {
    {
      new OpenApiSecurityScheme
      {
        Reference = new OpenApiReference
        {
          Type=ReferenceType.SecurityScheme,
          Id="Bearer"
        }
    },
      new string[]{}
    }
  });
}); // api doc


// connect db
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<serverDbContext>(options => 
  options.UseSqlServer(connectionString)
);


// add identity service
builder.Services.AddIdentity<User, IdentityRole>(options => {
  options.Password.RequireDigit = true;
  options.Password.RequireLowercase = true;
  options.Password.RequireLowercase = true;
  options.Password.RequiredLength = 12;
}).AddEntityFrameworkStores<serverDbContext>();


// add authentication service
builder.Services.AddAuthentication(options => {
  options.DefaultAuthenticateScheme = 
  options.DefaultChallengeScheme = 
  options.DefaultForbidScheme = 
  options.DefaultScheme = 
  options.DefaultSignInScheme = 
  options.DefaultSignOutScheme = JwtBearerDefaults.AuthenticationScheme;
}).AddJwtBearer(options => {
  options.TokenValidationParameters = new TokenValidationParameters
  {
    ValidateIssuer = true,
    ValidIssuer = builder.Configuration["JWT:Issuer"],
    ValidateAudience = true,
    ValidAudience = builder.Configuration["JWT:Audience"],
    ValidateIssuerSigningKey = true,
    IssuerSigningKey = new SymmetricSecurityKey
    (
      System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JWT:SigningKey"])
    )
  };
});


// register repositories and services
builder.Services.AddScoped<IMessageRepo, MessageRepo>();
builder.Services.AddScoped<IChatRepo, ChatRepo>();
builder.Services.AddScoped<ITokenService, TokenService>();


var app = builder.Build();


// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}


app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("AllowSpecificOrigins");

app.MapControllers();
app.MapHub<ChatHub>("/hub").RequireCors("AllowSpecificOrigins");

app.Run();