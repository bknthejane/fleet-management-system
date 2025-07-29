using System.Threading.Tasks;
using Abp.Application.Services;
using FleetManagementSystem.Sessions.Dto;

namespace FleetManagementSystem.Sessions
{
    public interface ISessionAppService : IApplicationService
    {
        Task<GetCurrentLoginInformationsOutput> GetCurrentLoginInformations();
    }
}
