aspnet deploy to zip thing etc azure webapp
=


webapp1.csproj
=
```XML
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    <TargetFramework>net6.0</TargetFramework>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>

</Project>
```

Class1.cs
==

```C#
internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        var app = builder.Build();

        app.MapGet("/", () =>
            {
                return $"{DateTime.Now}";
            }
        );

        app.Run();
    }
}
```

Deploying
==
```PowerShell
dotnet publish webapp1 --configuration Release
Remove-Item webapp1.zip
cd .\webapp1\bin\Release\net6.0\publish\
Compress-Archive -path * -DestinationPath ..\..\..\..\..\webapp1.zip
cd ..\..\..\..\..
Publish-AzWebApp -ResourceGroupName RESOURCE_GROUP_NAME -name APP_SERVICE_NAME -ArchivePath .\webapp1.zip
```

