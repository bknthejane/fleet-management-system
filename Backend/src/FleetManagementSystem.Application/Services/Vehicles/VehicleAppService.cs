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
            var vehicles = await _vehicleRepository.GetAll()
                .Include(v => v.Municipality)
                .Include(v => v.AssignedDriver)
                .ToListAsync();

            var vehicleDtos = ObjectMapper.Map<List<VehicleDto>>(vehicles);

            for (int i = 0; i < vehicles.Count; i++)
            {
                vehicleDtos[i].MunicipalityName = vehicles[i].Municipality?.Name;
                vehicleDtos[i].AssignedDriverName = vehicles[i].AssignedDriver?.Name;
            }

            return vehicleDtos;
        }

        public async Task<VehicleDto> GetAsync(Guid id)
        {
            var vehicle = await _vehicleRepository.GetAll()
                .Include(v => v.Municipality)
                .Include(v => v.AssignedDriver)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (vehicle == null)
                throw new UserFriendlyException("Vehicle not found.");

            var dto = ObjectMapper.Map<VehicleDto>(vehicle);
            dto.MunicipalityName = vehicle.Municipality?.Name;
            dto.AssignedDriverName = vehicle.AssignedDriver?.Name;

            return dto;
        }

        public async Task<VehicleDto> CreateAsync(CreateVehicleDto input)
        {
            var vehicle = ObjectMapper.Map<Vehicle>(input);
            vehicle.Id = Guid.NewGuid();

            var municipality = await _municipalityRepository.GetAsync(vehicle.MunicipalityId);
            vehicle.MunicipalityName = municipality?.Name;

            vehicle.AssignedDriverId = null;
            vehicle.AssignedDriverName = null;

            await _vehicleRepository.InsertAsync(vehicle);
            await CurrentUnitOfWork.SaveChangesAsync();

            return await GetAsync(vehicle.Id);
        }

        public async Task<VehicleDto> UpdateAsync(UpdateVehicleDto input)
        {
            var vehicle = await _vehicleRepository.GetAsync(input.Id);
            if (vehicle == null)
                throw new UserFriendlyException("Vehicle not found.");

            var oldAssignedDriverId = vehicle.AssignedDriverId;

            ObjectMapper.Map(input, vehicle);

            var municipality = await _municipalityRepository.GetAsync(vehicle.MunicipalityId);
            vehicle.MunicipalityName = municipality?.Name;

            if (oldAssignedDriverId != vehicle.AssignedDriverId)
            {
                if (oldAssignedDriverId.HasValue)
                {
                    var oldDriver = await _driverRepository.GetAsync(oldAssignedDriverId.Value);
                    oldDriver.AssignedVehicleId = null;
                    oldDriver.AssignedVehicleFleetNumber = null;
                    await _driverRepository.UpdateAsync(oldDriver);
                }

                if (vehicle.AssignedDriverId.HasValue)
                {
                    var newDriver = await _driverRepository.GetAsync(vehicle.AssignedDriverId.Value);

                    if (newDriver.MunicipalityId != vehicle.MunicipalityId)
                        throw new UserFriendlyException("Driver and Vehicle must belong to the same municipality.");

                    if (newDriver.AssignedVehicleId.HasValue && newDriver.AssignedVehicleId != vehicle.Id)
                    {
                        var oldVehicle = await _vehicleRepository.GetAsync(newDriver.AssignedVehicleId.Value);
                        oldVehicle.AssignedDriverId = null;
                        oldVehicle.AssignedDriverName = null;
                        await _vehicleRepository.UpdateAsync(oldVehicle);
                    }

                    newDriver.AssignedVehicleId = vehicle.Id;
                    newDriver.AssignedVehicleFleetNumber = vehicle.FleetNumber;
                    vehicle.AssignedDriverName = newDriver.Name;
                    await _driverRepository.UpdateAsync(newDriver);
                }
                else
                {
                    vehicle.AssignedDriverName = null;
                }
            }

            await _vehicleRepository.UpdateAsync(vehicle);
            await CurrentUnitOfWork.SaveChangesAsync();

            return await GetAsync(vehicle.Id);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _vehicleRepository.DeleteAsync(id);
        }
    }
}
