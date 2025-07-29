using Abp.AspNetCore;
using Abp.AspNetCore.TestBase;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FleetManagementSystem.EntityFrameworkCore;
using FleetManagementSystem.Web.Startup;
using Microsoft.AspNetCore.Mvc.ApplicationParts;

namespace FleetManagementSystem.Web.Tests
{
    [DependsOn(
        typeof(FleetManagementSystemWebMvcModule),
        typeof(AbpAspNetCoreTestBaseModule)
    )]
    public class FleetManagementSystemWebTestModule : AbpModule
    {
        public FleetManagementSystemWebTestModule(FleetManagementSystemEntityFrameworkModule abpProjectNameEntityFrameworkModule)
        {
            abpProjectNameEntityFrameworkModule.SkipDbContextRegistration = true;
        } 
        
        public override void PreInitialize()
        {
            Configuration.UnitOfWork.IsTransactional = false; //EF Core InMemory DB does not support transactions.
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FleetManagementSystemWebTestModule).GetAssembly());
        }
        
        public override void PostInitialize()
        {
            IocManager.Resolve<ApplicationPartManager>()
                .AddApplicationPartsIfNotAddedBefore(typeof(FleetManagementSystemWebMvcModule).Assembly);
        }
    }
}