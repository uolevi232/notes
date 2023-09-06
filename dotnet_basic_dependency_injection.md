basic dependency injection dotnet (core 6)
=

project setup
=
```PowerShell
dotnet new sln
dotnet new console --name console_di
dotnet sln add console_di\console_di.csproj
cd console_di

dotnet add package Microsoft.Extensions.Hosting
dotnet add package Microsoft.Extensions.Logging
dotnet add package Microsoft.Extensions.Configuration.Binder
dotnet add package Microsoft.Extensions.Configuration.Json

```

Program.cs
==

```C#
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Configuration;

internal class Program
{
    private static async Task Main(string[] args)
    {
        var builder = Host.CreateDefaultBuilder(args);
        builder.ConfigureServices(services =>
        {
            services.AddLogging();
            services.AddHostedService<Worker>();
        });

        var host = builder.Build();
        await host.RunAsync();
    }

    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        private readonly IConfiguration _configuration;

        public Worker(ILogger<Worker> logger, IConfiguration configuration)
        {
            _logger = logger;
            _configuration = configuration;
        }

        protected override Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var name = _configuration["NameOfToad"];
            _logger.LogInformation($"Hello, {name}");
            return Task.CompletedTask;
        }
    }
}
```

appsettings.json
==

```JSON
{
  "DetailedErrors": true,
  "Logging": {
    "LogLevel": {
      "Default": "Information"
    }
  },
  "NameOfToad" : "Neil"
}
```