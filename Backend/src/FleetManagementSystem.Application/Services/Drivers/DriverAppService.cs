using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using FleetManagementSystem.Authorization.Roles;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Services.Drivers.Dto;
using Microsoft.AspNetCore.Identity;

namespace FleetManagementSystem.Services.Drivers
{
    public class DriverAppService : ApplicationService, IDriverAppService
    {
        private readonly IRepository<Driver, Guid> _driverRepository;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public DriverAppService(IRepository<Driver, Guid> driverRepository, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _driverRepository = driverRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<DriverDto>> GetAllAsync()
        {
            var entities = await _driverRepository.GetAllListAsync();
            return ObjectMapper.Map<List<DriverDto>>(entities);
        }

        public async Task<DriverDto> GetAsync(Guid id)
        {
            var entity = await _driverRepository.GetAsync(id);
            return ObjectMapper.Map<DriverDto>(entity);
        }

        public async Task<DriverDto> CreateAsync(CreateDriverDto input)
        {
            var user = new User
            {
                UserName = input.Username,
                EmailAddress = input.Email,
                Name = input.Name,
                Surname = input.Surname,
                IsActive = true,
                MunicipalityId = input.MunicipalityId
            };

            var result = await _userManager.CreateAsync(user, input.Password);

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

            var driver = ObjectMapper.Map<Driver>(input);
            driver.Id = Guid.NewGuid();
            driver.UserId = user.Id;

            await _driverRepository.InsertAsync(driver);

            return ObjectMapper.Map<DriverDto>(driver);
        }

        public async Task<DriverDto> UpdateAsync(UpdateDriverDto input)
        {
            var driver = await _driverRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, driver);
            await _driverRepository.UpdateAsync(driver);
            return ObjectMapper.Map<DriverDto>(driver);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _driverRepository.DeleteAsync(id);
        }
    }
}
