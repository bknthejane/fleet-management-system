using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Domain.Vehicles;
using FleetManagementSystem.Services.Vehicles.Dto;
using Microsoft.EntityFrameworkCore;

namespace FleetManagementSystem.Services.Vehicles
{
    public class VehicleAppService : ApplicationService, IVehicleAppService
    {
        private readonly IRepository<Vehicle, Guid> _vehicleRepository;
        private readonly IRepository<Driver, Guid> _driverRepository;
        private readonly IRepository<Municipality, Guid> _municipalityRepository;

        public VehicleAppService(
            IRepository<Vehicle, Guid> vehicleRepository,
            IRepository<Driver, Guid> driverRepository,
            IRepository<Municipality, Guid> municipalityRepository)
        {
            _vehicleRepository = vehicleRepository;
            _driverRepository = driverRepository;
            _municipalityRepository = municipalityRepository;
        }

        public async Task<List<VehicleDto>> GetAllAsync()
        {
            var vehicles = await _vehicleRepository.GetAllListAsync();
            return ObjectMapper.Map<List<VehicleDto>>(vehicles);
        }

        public async Task<VehicleDto> GetAsync(Guid id)
        {
            var vehicle = await _vehicleRepository.FirstOrDefaultAsync(v => v.Id == id);
            if (vehicle == null)
                throw new UserFriendlyException("Vehicle not found.");

            return ObjectMapper.Map<VehicleDto>(vehicle);
        }

        public async Task<VehicleDto> CreateAsync(CreateVehicleDto input)
        {
            var vehicle = ObjectMapper.Map<Vehicle>(input);
            vehicle.Id = Guid.NewGuid();

            // Fill DB columns for MunicipalityName and AssignedDriverName
            var municipality = await _municipalityRepository.FirstOrDefaultAsync(m => m.Id == vehicle.MunicipalityId);
            vehicle.MunicipalityName = municipality?.Name;

            if (vehicle.AssignedDriverId.HasValue)
            {
                var driver = await _driverRepository.FirstOrDefaultAsync(d => d.Id == vehicle.AssignedDriverId.Value);
                vehicle.AssignedDriverName = driver?.Name;
            }

            await _vehicleRepository.InsertAsync(vehicle);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<VehicleDto>(vehicle);
        }

        public async Task<VehicleDto> UpdateAsync(UpdateVehicleDto input)
        {
            var vehicle = await _vehicleRepository.GetAsync(input.Id);
            if (vehicle == null)
                throw new UserFriendlyException("Vehicle not found.");

            var oldAssignedDriverId = vehicle.AssignedDriverId;

            ObjectMapper.Map(input, vehicle);

            // Update stored names in DB
            var municipality = await _municipalityRepository.FirstOrDefaultAsync(m => m.Id == vehicle.MunicipalityId);
            vehicle.MunicipalityName = municipality?.Name;

            if (vehicle.AssignedDriverId.HasValue)
            {
                var driver = await _driverRepository.GetAsync(vehicle.AssignedDriverId.Value);

                // Municipality check
                if (driver.MunicipalityId != vehicle.MunicipalityId)
                    throw new UserFriendlyException("Driver and Vehicle must belong to the same municipality.");

                // Unassign old vehicle if driver had one
                if (driver.AssignedVehicleId.HasValue && driver.AssignedVehicleId != vehicle.Id)
                {
                    var oldVehicle = await _vehicleRepository.GetAsync(driver.AssignedVehicleId.Value);
                    oldVehicle.AssignedDriverId = null;
                    oldVehicle.AssignedDriverName = null;
                    await _vehicleRepository.UpdateAsync(oldVehicle);
                }

                driver.AssignedVehicleId = vehicle.Id;
                vehicle.AssignedDriverName = driver.Name;
                await _driverRepository.UpdateAsync(driver);
            }
            else
            {
                vehicle.AssignedDriverName = null;
            }

            await _vehicleRepository.UpdateAsync(vehicle);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<VehicleDto>(vehicle);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _vehicleRepository.DeleteAsync(id);
        }
    }
}
