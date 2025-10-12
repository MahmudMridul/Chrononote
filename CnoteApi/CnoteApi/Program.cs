using CnoteApi.Database;
using CnoteApi.Repositories;
using CnoteApi.Repositories.IRepositories;
using CnoteApi.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace CnoteApi
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();

            builder.Services.AddDbContext<AppDbContext>(
                op => op.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
            );

            // Repositories
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            builder.Services.AddScoped<ITimeCardRepository, TimeCardRepository>();
            builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
            builder.Services.AddScoped<INoteRepository, NoteRepository>();

            // Services
            builder.Services.AddScoped<AuthValidationService>();
            builder.Services.AddScoped<TokenService>();

            // CORS
            builder.Services.AddCors(op =>
            {
                var cors = builder.Configuration.GetSection("Cors");
                var allowedOrigins = cors.GetSection("AllowedOrigins").Get<string[]>() ?? Array.Empty<string>();
                var allowedMethods = cors.GetSection("AllowedMethods").Get<string[]>() ?? Array.Empty<string>();
                var allowCredentials = cors.GetValue<bool>("AllowCredentials");

                op.AddPolicy("AllowClient", policy =>
                {
                    policy.WithOrigins(allowedOrigins)
                    .WithMethods(allowedMethods)
                    .AllowAnyHeader();

                    if (allowCredentials)
                    {
                        policy.AllowCredentials();
                    }
                });
            });

            // JWT 
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(op =>
                {
                    op.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
                        ValidAudience = builder.Configuration["JwtSettings:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:Key"]!)),
                        ClockSkew = TimeSpan.Zero
                    };

                });
            

            var app = builder.Build();

            app.UseCors("AllowClient"); 

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
            }

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
