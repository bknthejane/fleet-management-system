using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using FleetManagementSystem.Services.Mechanics.Dto;

namespace FleetManagementSystem.Services.Mechanics
{
    public interface IMechanicAppService : IApplicationService
    {
        Task<List<MechanicDto>> GetAllAsync();
        Task<MechanicDto> GetAsync(Guid id);
        Task<MechanicDto> CreateAsync(CreateMechanicDto input);
        Task<MechanicDto> UpdateAsync(UpdateMechanicDto input);
        Task DeleteAsync(Guid id);
    }
}
