using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using FleetManagementSystem.Authorization.Roles;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.MultiTenancy;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using System;
using System.Linq;
using FleetManagementSystem.Domain.Municipalities;

namespace FleetManagementSystem.EntityFrameworkCore
{
    public class FleetManagementSystemDbContext : AbpZeroDbContext<Tenant, Role, User, FleetManagementSystemDbContext>
    {
        /* Define a DbSet for each entity of the application */
        public DbSet<Municipality> Municipalities { get; set; }

        public FleetManagementSystemDbContext(DbContextOptions<FleetManagementSystemDbContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
                v => v.Kind == DateTimeKind.Utc ? v : v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc));

            var nullableDateTimeConverter = new ValueConverter<DateTime?, DateTime?>(
                v => v.HasValue ? (v.Value.Kind == DateTimeKind.Utc ? v : v.Value.ToUniversalTime()) : v,
                v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v);

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime))
                        property.SetValueConverter(dateTimeConverter);

                    if (property.ClrType == typeof(DateTime?))
                        property.SetValueConverter(nullableDateTimeConverter);
                }
            }

            base.OnModelCreating(modelBuilder);
        }

    }
}
