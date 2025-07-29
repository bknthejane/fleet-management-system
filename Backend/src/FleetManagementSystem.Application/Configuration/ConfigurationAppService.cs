using System.Threading.Tasks;
using Abp.Authorization;
using Abp.Runtime.Session;
using FleetManagementSystem.Configuration.Dto;

namespace FleetManagementSystem.Configuration
{
    [AbpAuthorize]
    public class ConfigurationAppService : FleetManagementSystemAppServiceBase, IConfigurationAppService
    {
        public async Task ChangeUiTheme(ChangeUiThemeInput input)
        {
            await SettingManager.ChangeSettingForUserAsync(AbpSession.ToUserIdentifier(), AppSettingNames.UiTheme, input.Theme);
        }
    }
}
