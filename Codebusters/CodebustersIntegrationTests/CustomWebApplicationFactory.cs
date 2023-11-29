using Codebusters.Data;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace CodebustersIntegrationTests;

public class CustomWebApplicationFactory<TProgram> : WebApplicationFactory<TProgram> where TProgram : class
{
    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureServices(services =>
        {
            var dbContextDescriptor = services.SingleOrDefault(
                d => d.ServiceType ==
                     typeof(DbContextOptions<UsersContext>));

            services.Remove(dbContextDescriptor);

            services.AddDbContext<UsersContext>((container, options) =>
            {
                options.UseInMemoryDatabase("codebustersTest");
            });
        });

        builder.UseEnvironment("Development");
    }
}