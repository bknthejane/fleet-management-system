using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.Vehicles;
using FleetManagementSystem.Services.Vehicles.Dto;

namespace FleetManagementSystem.Services.Vehicles
{
    public class VehicleAppService : ApplicationService, IVehicleAppService
    {
        private readonly IRepository<Vehicle, Guid> _vehicleRepository;
        private readonly IRepository<Driver, Guid> _driverRepository;

        public VehicleAppService(IRepository<Vehicle, Guid> vehicleRepository, IRepository<Driver, Guid> driverRepository)
        {
            _vehicleRepository = vehicleRepository;
            _driverRepository = driverRepository;
        }

        public async Task<List<VehicleDto>> GetAllAsync()
        {
            var entities = await _vehicleRepository.GetAllListAsync();
            return ObjectMapper.Map<List<VehicleDto>>(entities);
        }

        public async Task<VehicleDto> GetAsync(Guid id)
        {
            var entity = await _vehicleRepository.GetAsync(id);
            return ObjectMapper.Map<VehicleDto>(entity);
        }

        public async Task<VehicleDto> CreateAsync(CreateVehicleDto input)
        {
            var vehicle = ObjectMapper.Map<Vehicle>(input);
            vehicle.Id = Guid.NewGuid();

            await _vehicleRepository.InsertAsync(vehicle);
            return ObjectMapper.Map<VehicleDto>(vehicle);
        }

        public async Task<VehicleDto> UpdateAsync(UpdateVehicleDto input)
        {
            var vehicle = await _vehicleRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, vehicle);
            await _vehicleRepository.UpdateAsync(vehicle);

            return ObjectMapper.Map<VehicleDto>(vehicle);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _vehicleRepository.DeleteAsync(id);
        }

        public async Task AssignVehicleToDriver(Guid vehicleId, Guid driverId)
        {
            var vehicle = await _vehicleRepository.GetAsync(vehicleId);
            var driver = await _driverRepository.GetAsync(driverId);

            if (vehicle == null)
                throw new UserFriendlyException("Vehicle not found.");

            if (driver == null)
                throw new UserFriendlyException("Driver not found.");

            // Ensure they belong to the same municipality
            if (vehicle.MunicipalityId != driver.MunicipalityId)
                throw new UserFriendlyException("Driver and Vehicle must belong to the same municipality.");

            // Unassign previous driver if the vehicle is already assigned
            if (vehicle.AssignedDriverId.HasValue)
            {
                var oldDriver = await _driverRepository.GetAsync(vehicle.AssignedDriverId.Value);
                oldDriver.AssignedVehicleId = null;
                await _driverRepository.UpdateAsync(oldDriver);
            }

            // If the driver already had a vehicle, unassign it
            if (driver.AssignedVehicleId.HasValue)
            {
                var oldVehicle = await _vehicleRepository.GetAsync(driver.AssignedVehicleId.Value);
                oldVehicle.AssignedDriverId = null;
                await _vehicleRepository.UpdateAsync(oldVehicle);
            }

            // Assign vehicle to driver
            vehicle.AssignedDriverId = driver.Id;
            driver.AssignedVehicleId = vehicle.Id;

            await _vehicleRepository.UpdateAsync(vehicle);
            await _driverRepository.UpdateAsync(driver);
        }

    }
}
