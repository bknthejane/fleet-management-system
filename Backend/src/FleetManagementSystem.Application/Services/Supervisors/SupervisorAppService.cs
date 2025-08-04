using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FleetManagementSystem.Authorization.Roles;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Supervisors;
using FleetManagementSystem.Services.Supervisors.Dto;
using Microsoft.AspNetCore.Identity;

namespace FleetManagementSystem.Services.Supervisors
{
    public class SupervisorAppService : ApplicationService, ISupervisorAppService
    {
        private readonly IRepository<Supervisor, Guid> _supervisorRepository;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public SupervisorAppService( IRepository<Supervisor, Guid> supervisorRepository, UserManager<User> userManager, RoleManager<Role> roleManager)
        {
            _supervisorRepository = supervisorRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<SupervisorDto>> GetAllAsync()
        {
            var entities = await _supervisorRepository.GetAllListAsync();
            return ObjectMapper.Map<List<SupervisorDto>>(entities);
        }

        public async Task<SupervisorDto> GetAsync(Guid id)
        {
            var entity = await _supervisorRepository.GetAsync(id);
            return ObjectMapper.Map<SupervisorDto>(entity);
        }

        public async Task<SupervisorDto> CreateAsync(CreateSupervisorDto input)
        {

            var user = new User
            {
                UserName = input.Username,
                EmailAddress = input.Email,
                Name = input.Name,
                Surname = input.Surname,
                IsActive = true,
                MunicipalityId = input.MunicipalityId,
                MunicipalityName = input.MunicipalityName,

            };

            if (string.IsNullOrWhiteSpace(user.UserName))
                throw new UserFriendlyException("Supervisor username is required.");

            if (string.IsNullOrWhiteSpace(user.EmailAddress))
                throw new UserFriendlyException("Supervisor email is required.");

            var result = await _userManager.CreateAsync(user, input.Password);

            var roleName = "Supervisor";
            if (!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new Role
                {
                    Name = roleName,
                    DisplayName = "Supervisor",
                    IsStatic = true,
                });
            }

            await _userManager.AddToRoleAsync(user, roleName);

            var supervisor = ObjectMapper.Map<Supervisor>(input);
            supervisor.Id = Guid.NewGuid();
            supervisor.UserId = user.Id;

            supervisor.MunicipalityId = input.MunicipalityId;

            await _supervisorRepository.InsertAsync(supervisor);

            return ObjectMapper.Map<SupervisorDto>(supervisor);
        }

        public async Task<SupervisorDto> UpdateAsync(UpdateSupervisorDto input)
        {
            var supervisor = await _supervisorRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, supervisor);
            await _supervisorRepository.UpdateAsync(supervisor);
            return ObjectMapper.Map<SupervisorDto>(supervisor);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _supervisorRepository.DeleteAsync(id);
        }
    }
}
