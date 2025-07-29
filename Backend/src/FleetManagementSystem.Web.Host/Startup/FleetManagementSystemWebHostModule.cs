using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Abp.Modules;
using Abp.Reflection.Extensions;
using FleetManagementSystem.Configuration;

namespace FleetManagementSystem.Web.Host.Startup
{
    [DependsOn(
       typeof(FleetManagementSystemWebCoreModule))]
    public class FleetManagementSystemWebHostModule: AbpModule
    {
        private readonly IWebHostEnvironment _env;
        private readonly IConfigurationRoot _appConfiguration;

        public FleetManagementSystemWebHostModule(IWebHostEnvironment env)
        {
            _env = env;
            _appConfiguration = env.GetAppConfiguration();
        }

        public override void Initialize()
        {
            IocManager.RegisterAssemblyByConvention(typeof(FleetManagementSystemWebHostModule).GetAssembly());
        }
    }
}
