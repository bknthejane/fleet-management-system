using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FleetManagementSystem.Authorization.Roles;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Services.Municipalities.Dto;
using Microsoft.AspNetCore.Identity;

namespace FleetManagementSystem.Services.Municipalities
{
    public class MunicipalityAppService : ApplicationService, IMunicipalityAppService
    {
        private readonly IRepository<Municipality, Guid> _municipalityRepository;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public MunicipalityAppService(IRepository<Municipality, Guid> municipalityRepository, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _municipalityRepository = municipalityRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<MunicipalityDto>> GetAllAsync()
        {
            var entities = await _municipalityRepository.GetAllListAsync();
            return ObjectMapper.Map<List<MunicipalityDto>>(entities);
        }

        public async Task<MunicipalityDto> GetAsync(Guid id)
        {
            var entity = await _municipalityRepository.GetAsync(id);
            return ObjectMapper.Map<MunicipalityDto>(entity);
        }

        public async Task<MunicipalityDto> CreateAsync(CreateMunicipalityDto input)
        {
            var municipality = ObjectMapper.Map<Municipality>(input);
            municipality.Id = Guid.NewGuid();
            await _municipalityRepository.InsertAsync(municipality);

            var user = new User
            {
                UserName = input.AdminUserName,
                EmailAddress = input.AdminEmail,
                Name = input.ContactPerson,
                Surname = "Admin",
                IsActive = true,
                MunicipalityId = municipality.Id,
                MunicipalityName = municipality.Name
            };

            if (string.IsNullOrWhiteSpace(user.UserName))
                throw new UserFriendlyException("Admin username is required.");

            if (string.IsNullOrWhiteSpace(user.EmailAddress))
                throw new UserFriendlyException("Admin email is required.");

            var result = await _userManager.CreateAsync(user, input.AdminPassword);

            var roleName = "MunicipalityAdmin";
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new Role
                {
                    Name = roleName,
                    DisplayName = "Municipality Admin",
                    IsStatic = true,
                });
            }

            await _userManager.AddToRoleAsync(user, roleName);
            return ObjectMapper.Map<MunicipalityDto>(municipality);
        }

        public async Task<MunicipalityDto> UpdateAsync(UpdateMunicipalityDto input)
        {
            var entity = await _municipalityRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, entity);
            await _municipalityRepository.UpdateAsync(entity);
            return ObjectMapper.Map<MunicipalityDto>(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _municipalityRepository.DeleteAsync(id);
        }
    }
}
