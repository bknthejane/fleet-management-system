using Abp.EntityFrameworkCore.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using Abp.Zero.EntityFrameworkCore;
using FleetManagementSystem.EntityFrameworkCore.Seed;
using Abp.Timing;

namespace FleetManagementSystem.EntityFrameworkCore
{
    [DependsOn(
        typeof(FleetManagementSystemCoreModule),
        typeof(AbpZeroCoreEntityFrameworkCoreModule))]
    public class FleetManagementSystemEntityFrameworkModule : AbpModule
    {
        /* Used in tests to skip DbContext registration, in order to use in-memory database of EF Core */
        public bool SkipDbContextRegistration { get; set; }

        public bool SkipDbSeed { get; set; }

        public override void PreInitialize()
        {
            Abp.Timing.Clock.Provider = ClockProviders.Utc;

            if (!SkipDbContextRegistration)
            {
                Configuration.Modules.AbpEfCore().AddDbContext<FleetManagementSystemDbContext>(options =>
                {
                    if (options.ExistingConnection != null)
                    {
                        FleetManagementSystemDbContextConfigurer.Configure(options.DbContextOptions, options.ExistingConnection);
                    }
                    else
                    {
                        FleetManagementSystemDbContextConfigurer.Configure(options.DbContextOptions, options.ConnectionString);
                    }
                });
            }
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FleetManagementSystemEntityFrameworkModule).GetAssembly());
        }

        public override void PostInitialize()
        {
            if (!SkipDbSeed)
            {
                SeedHelper.SeedHostDb(IocManager);
            }
        }
    }
}
