using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FleetManagementSystem.Authorization.Roles;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Domain.Vehicles;
using FleetManagementSystem.Services.Drivers.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FleetManagementSystem.Services.Drivers
{
    public class DriverAppService : ApplicationService, IDriverAppService
    {
        private readonly IRepository<Driver, Guid> _driverRepository;
        private readonly IRepository<Vehicle, Guid> _vehicleRepository;
        private readonly IRepository<Municipality, Guid> _municipalityRepository;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public DriverAppService(
            IRepository<Driver, Guid> driverRepository,
            IRepository<Vehicle, Guid> vehicleRepository,
            IRepository<Municipality, Guid> municipalityRepository,
            UserManager<User> userManager,
            RoleManager<Role> roleManager)
        {
            _driverRepository = driverRepository;
            _vehicleRepository = vehicleRepository;
            _municipalityRepository = municipalityRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<DriverDto>> GetAllAsync()
        {
            var drivers = await _driverRepository.GetAll()
                .Include(d => d.Municipality)
                .Include(d => d.AssignedVehicle)
                .ToListAsync();

            var driverDtos = ObjectMapper.Map<List<DriverDto>>(drivers);

            for (int i = 0; i < drivers.Count; i++)
            {
                driverDtos[i].MunicipalityName = drivers[i].Municipality?.Name;
                driverDtos[i].AssignedVehicleFleetNumber = drivers[i].AssignedVehicle?.FleetNumber;
            }

            return driverDtos;
        }

        public async Task<DriverDto> GetAsync(Guid id)
        {
            var driver = await _driverRepository.GetAll()
                .Include(d => d.Municipality)
                .Include(d => d.AssignedVehicle)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (driver == null)
                throw new UserFriendlyException("Driver not found.");

            var dto = ObjectMapper.Map<DriverDto>(driver);
            dto.MunicipalityName = driver.Municipality?.Name;
            dto.AssignedVehicleFleetNumber = driver.AssignedVehicle?.FleetNumber;

            return dto;
        }

        public async Task<DriverDto> CreateAsync(CreateDriverDto input)
        {
            // 1. Create the Driver first
            var driver = ObjectMapper.Map<Driver>(input);
            driver.Id = Guid.NewGuid();

            // Set default unassigned vehicle fields
            driver.AssignedVehicleId = null;
            driver.AssignedVehicleFleetNumber = null;

            // Get Municipality name
            var municipality = await _municipalityRepository.GetAsync(input.MunicipalityId);
            driver.MunicipalityName = municipality?.Name;

            await _driverRepository.InsertAsync(driver);
            await CurrentUnitOfWork.SaveChangesAsync(); // Ensure driver is flushed

            // 2. Create the linked User
            var user = new User
            {
                UserName = input.Username,
                EmailAddress = input.Email,
                Name = input.Name,
                Surname = input.Surname,
                IsActive = true,
                MunicipalityId = input.MunicipalityId,
                MunicipalityName = driver.MunicipalityName,
                DriverId = driver.Id,
                DriverName = $"{input.Name} {input.Surname}"
            };

            var result = await _userManager.CreateAsync(user, input.Password);
            if (!result.Succeeded)
                throw new UserFriendlyException("User creation failed: " + string.Join(", ", result.Errors));

            // Assign role
            var roleName = "Driver";
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new Role
                {
                    Name = roleName,
                    DisplayName = "Driver",
                    IsStatic = true
                });
            }
            await _userManager.AddToRoleAsync(user, roleName);

            await CurrentUnitOfWork.SaveChangesAsync();

            // 3. Update driver with UserId
            driver.UserId = user.Id;
            await _driverRepository.UpdateAsync(driver);
            await CurrentUnitOfWork.SaveChangesAsync();

            return await GetAsync(driver.Id);
        }


        public async Task<DriverDto> UpdateAsync(UpdateDriverDto input)
        {
            var driver = await _driverRepository.GetAsync(input.Id);
            if (driver == null)
                throw new UserFriendlyException("Driver not found.");

            var oldAssignedVehicleId = driver.AssignedVehicleId;

            ObjectMapper.Map(input, driver);

            var municipality = await _municipalityRepository.GetAsync(driver.MunicipalityId);
            driver.MunicipalityName = municipality?.Name;

            var user = await _userManager.FindByIdAsync(driver.UserId.ToString());
            if (user == null)
                throw new UserFriendlyException("Linked user not found.");

            user.Name = input.Name;
            user.Surname = input.Surname;
            user.MunicipalityId = input.MunicipalityId;
            user.MunicipalityName = municipality?.Name;
            user.IsActive = true;

            var userUpdateResult = await _userManager.UpdateAsync(user);
            if (!userUpdateResult.Succeeded)
            {
                throw new UserFriendlyException("Failed to update user: " + string.Join(", ", userUpdateResult.Errors));
            }

            if (oldAssignedVehicleId != driver.AssignedVehicleId)
            {
                if (oldAssignedVehicleId.HasValue)
                {
                    var oldVehicle = await _vehicleRepository.GetAsync(oldAssignedVehicleId.Value);
                    oldVehicle.AssignedDriverId = null;
                    oldVehicle.AssignedDriverName = null;
                    await _vehicleRepository.UpdateAsync(oldVehicle);
                }

                if (driver.AssignedVehicleId.HasValue)
                {
                    var newVehicle = await _vehicleRepository.GetAsync(driver.AssignedVehicleId.Value);

                    if (newVehicle.MunicipalityId != driver.MunicipalityId)
                        throw new UserFriendlyException("Driver and Vehicle must belong to the same municipality.");

                    if (newVehicle.AssignedDriverId.HasValue && newVehicle.AssignedDriverId != driver.Id)
                    {
                        var oldDriver = await _driverRepository.GetAsync(newVehicle.AssignedDriverId.Value);
                        oldDriver.AssignedVehicleId = null;
                        oldDriver.AssignedVehicleFleetNumber = null;
                        await _driverRepository.UpdateAsync(oldDriver);
                    }

                    newVehicle.AssignedDriverId = driver.Id;
                    newVehicle.AssignedDriverName = driver.Name;
                    driver.AssignedVehicleFleetNumber = newVehicle.FleetNumber;
                    await _vehicleRepository.UpdateAsync(newVehicle);
                }
                else
                {
                    driver.AssignedVehicleFleetNumber = null;
                }
            }

            await _driverRepository.UpdateAsync(driver);
            await CurrentUnitOfWork.SaveChangesAsync();

            return await GetAsync(driver.Id);
        }


        public async Task DeleteAsync(Guid id)
        {
            await _driverRepository.DeleteAsync(id);
        }
    }
}
