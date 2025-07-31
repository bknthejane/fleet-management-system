using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using FleetManagementSystem.Services.Vehicles.Dto;

namespace FleetManagementSystem.Services.Vehicles
{
    public interface IVehicleAppService : IApplicationService
    {
        Task<List<VehicleDto>> GetAllAsync();
        Task<VehicleDto> GetAsync(Guid id);
        Task<VehicleDto> CreateAsync(CreateVehicleDto input);
        Task<VehicleDto> UpdateAsync(UpdateVehicleDto input);
        Task DeleteAsync(Guid id);
    }
}
