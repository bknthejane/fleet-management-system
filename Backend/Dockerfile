FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

COPY ["NuGet.Config", "."]
COPY ["src/FleetManagementSystem.Web.Host/FleetManagementSystem.Web.Host.csproj", "src/FleetManagementSystem.Web.Host/"]
COPY ["src/FleetManagementSystem.Application/FleetManagementSystem.Application.csproj", "src/FleetManagementSystem.Application/"]
COPY ["src/FleetManagementSystem.EntityFrameworkCore/FleetManagementSystem.EntityFrameworkCore.csproj", "src/FleetManagementSystem.EntityFrameworkCore/"]
COPY ["src/FleetManagementSystem.Core/FleetManagementSystem.Core.csproj", "src/FleetManagementSystem.Core/"]
COPY ["src/FleetManagementSystem.Web.Core/FleetManagementSystem.Web.Core.csproj", "src/FleetManagementSystem.Web.Core/"]

RUN dotnet restore "src/FleetManagementSystem.Web.Host/FleetManagementSystem.Web.Host.csproj"

COPY . .
WORKDIR /src/src/FleetManagementSystem.Web.Host
RUN dotnet build "FleetManagementSystem.Web.Host.csproj" -c "$BUILD_CONFIGURATION" -o /app/build

FROM build AS publish
ARG BUILD_CONFIGURATION=Release
WORKDIR /src/src/FleetManagementSystem.Web.Host
RUN dotnet publish "FleetManagementSystem.Web.Host.csproj" -c "$BUILD_CONFIGURATION" -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "FleetManagementSystem.Web.Host.dll"]



