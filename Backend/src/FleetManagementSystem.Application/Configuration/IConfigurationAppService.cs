using System.Threading.Tasks;
using FleetManagementSystem.Configuration.Dto;

namespace FleetManagementSystem.Configuration
{
    public interface IConfigurationAppService
    {
        Task ChangeUiTheme(ChangeUiThemeInput input);
    }
}
