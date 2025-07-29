using Abp.AspNetCore.Mvc.Controllers;
using Abp.IdentityFramework;
using Microsoft.AspNetCore.Identity;

namespace FleetManagementSystem.Controllers
{
    public abstract class FleetManagementSystemControllerBase: AbpController
    {
        protected FleetManagementSystemControllerBase()
        {
            LocalizationSourceName = FleetManagementSystemConsts.LocalizationSourceName;
        }

        protected void CheckErrors(IdentityResult identityResult)
        {
            identityResult.CheckErrors(LocalizationManager);
        }
    }
}
