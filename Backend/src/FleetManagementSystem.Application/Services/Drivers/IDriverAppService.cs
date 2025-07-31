using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using FleetManagementSystem.Services.Drivers.Dto;

namespace FleetManagementSystem.Services.Drivers
{
    public interface IDriverAppService : IApplicationService
    {
        Task<List<DriverDto>> GetAllAsync();
        Task<DriverDto> GetAsync(Guid id);
        Task<DriverDto> CreateAsync(CreateDriverDto input);
        Task<DriverDto> UpdateAsync(UpdateDriverDto input);
        Task DeleteAsync(Guid id);
    }
}
