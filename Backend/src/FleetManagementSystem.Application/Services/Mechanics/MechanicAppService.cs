using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FleetManagementSystem.Authorization.Roles;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Mechanics;
using FleetManagementSystem.Domain.Supervisors;
using FleetManagementSystem.Services.Mechanics.Dto;
using Microsoft.AspNetCore.Identity;

namespace FleetManagementSystem.Services.Mechanics
{
    public class MechanicAppService : ApplicationService, IMechanicAppService
    {
        private readonly IRepository<Mechanic, Guid> _mechanicRepository;
        private readonly IRepository<Supervisor, Guid> _supervisorRepository;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public MechanicAppService(IRepository<Mechanic, Guid> mechanicRepository, IRepository<Supervisor, Guid> supervisorRepository, UserManager<User> userManager,RoleManager<Role> roleManager)
        {
            _mechanicRepository = mechanicRepository;
            _supervisorRepository = supervisorRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<MechanicDto>> GetAllAsync()
        {
            var mechanics = await _mechanicRepository.GetAllListAsync();
            return ObjectMapper.Map<List<MechanicDto>>(mechanics);
        }

        public async Task<MechanicDto> GetAsync(Guid id)
        {
            var entity = await _mechanicRepository.GetAsync(id);
            return ObjectMapper.Map<MechanicDto>(entity);
        }

        public async Task<MechanicDto> CreateAsync(CreateMechanicDto input)
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
            if (!result.Succeeded)
                throw new UserFriendlyException("User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description)));

            var roleName = "Mechanic";
            if(!await _roleManager.RoleExistsAsync(roleName))
            {
                await _roleManager.CreateAsync(new Role
                {
                    Name = roleName,
                    DisplayName = "Mechanic",
                    IsStatic = true
                });
            }

            await _userManager.AddToRoleAsync(user, roleName);

            var supervisor = await _supervisorRepository.GetAsync(input.SupervisorId);
            if(supervisor == null)
                throw new UserFriendlyException("Supervisor not found");

            var mechanic = ObjectMapper.Map<Mechanic>(input);
            mechanic.Id = Guid.NewGuid();
            mechanic.UserId = user.Id;
            mechanic.Department = supervisor.Department;

            await _mechanicRepository.InsertAsync(mechanic);

            return ObjectMapper.Map<MechanicDto>(mechanic);
        }

        public async Task<MechanicDto> UpdateAsync(UpdateMechanicDto input)
        {
            var mechanic = await _mechanicRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, mechanic);
            await _mechanicRepository.UpdateAsync(mechanic);
            return ObjectMapper.Map<MechanicDto>(mechanic);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _mechanicRepository.DeleteAsync(id);
        }
    }
}
