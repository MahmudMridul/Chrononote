using CnoteApi.Database;
using Microsoft.EntityFrameworkCore;

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
            

            var app = builder.Build();

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
