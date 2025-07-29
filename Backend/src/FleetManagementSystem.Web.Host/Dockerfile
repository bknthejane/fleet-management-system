FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /app
COPY FleetManagementSystem.sln ./
COPY src/ ./src/

WORKDIR /app/src/FleetManagementSystem.Web.Host
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish

WORKDIR /src
COPY ["src/FleetManagementSystem.Web.Host/FleetManagementSystem.Web.Host.csproj", "src/FleetManagementSystem.Web.Host/"]
COPY ["src/FleetManagementSystem.Web.Core/FleetManagementSystem.Web.Core.csproj", "src/FleetManagementSystem.Web.Core/"]
COPY ["src/FleetManagementSystem.Application/FleetManagementSystem.Application.csproj", "src/FleetManagementSystem.Application/"]
COPY ["src/FleetManagementSystem.Core/FleetManagementSystem.Core.csproj", "src/FleetManagementSystem.Core/"]
COPY ["src/FleetManagementSystem.EntityFrameworkCore/FleetManagementSystem.EntityFrameworkCore.csproj", "src/FleetManagementSystem.EntityFrameworkCore/"]
WORKDIR "/src/src/FleetManagementSystem.Web.Host"
RUN dotnet restore 

WORKDIR /src
COPY ["src/FleetManagementSystem.Web.Host", "src/FleetManagementSystem.Web.Host"]
COPY ["src/FleetManagementSystem.Web.Core", "src/FleetManagementSystem.Web.Core"]
COPY ["src/FleetManagementSystem.Application", "src/FleetManagementSystem.Application"]
COPY ["src/FleetManagementSystem.Core", "src/FleetManagementSystem.Core"]
COPY ["src/FleetManagementSystem.EntityFrameworkCore", "src/FleetManagementSystem.EntityFrameworkCore"]
WORKDIR "/src/src/FleetManagementSystem.Web.Host"
RUN dotnet publish -c Release -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
COPY --from=build /app/publish .

ENV ASPNETCORE_URLS=http://+:80
EXPOSE 80

ENTRYPOINT ["dotnet", "FleetManagementSystem.Web.Host.dll"]