using System;
using System.Threading.Tasks;
using Abp.Application.Services;
using FleetManagementSystem.Services.Supervisors.Dto;

namespace FleetManagementSystem.Services.Supervisors
{
    public interface ISupervisorAppService : IApplicationService
    {
        Task<SupervisorDto> GetAsync(Guid id);
        Task<SupervisorDto> CreateAsync(CreateSupervisorDto input);
        Task<SupervisorDto> UpdateAsync(UpdateSupervisorDto input);
        Task DeleteAsync(Guid id);
    }
}
