using Abp.AutoMapper;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FleetManagementSystem.Authorization;

namespace FleetManagementSystem
{
    [DependsOn(
        typeof(FleetManagementSystemCoreModule), 
        typeof(AbpAutoMapperModule))]
    public class FleetManagementSystemApplicationModule : AbpModule
    {
        public override void PreInitialize()
        {
            Configuration.Authorization.Providers.Add<FleetManagementSystemAuthorizationProvider>();
        }

        public override void Initialize()
        {
            var thisAssembly = typeof(FleetManagementSystemApplicationModule).GetAssembly();

            IocManager.RegisterAssemblyByConvention(thisAssembly);

            Configuration.Modules.AbpAutoMapper().Configurators.Add(
                // Scan the assembly for classes which inherit from AutoMapper.Profile
                cfg => cfg.AddMaps(thisAssembly)
            );
        }
    }
}
