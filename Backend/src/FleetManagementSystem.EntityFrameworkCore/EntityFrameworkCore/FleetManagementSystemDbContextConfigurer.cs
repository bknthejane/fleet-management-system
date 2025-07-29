using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace FleetManagementSystem.EntityFrameworkCore
{
    public static class FleetManagementSystemDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<FleetManagementSystemDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<FleetManagementSystemDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
