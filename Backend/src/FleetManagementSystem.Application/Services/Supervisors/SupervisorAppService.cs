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
            // Step 1: Create Supervisor first
            var supervisor = ObjectMapper.Map<Supervisor>(input);
            supervisor.Id = Guid.NewGuid();
            supervisor.MunicipalityId = input.MunicipalityId;
            supervisor.MunicipalityName = input.MunicipalityName;

            await _supervisorRepository.InsertAsync(supervisor);
            await CurrentUnitOfWork.SaveChangesAsync();

            // Step 2: Create linked User
            var user = new User
            {
                UserName = input.Username,
                EmailAddress = input.Email,
                Name = input.Name,
                Surname = input.Surname,
                IsActive = true,
                MunicipalityId = input.MunicipalityId,
                MunicipalityName = input.MunicipalityName,
                SupervisorId = supervisor.Id,
                SupervisorName = $"{input.Name} {input.Surname}"
            };

            var result = await _userManager.CreateAsync(user, input.Password);
            if (!result.Succeeded)
                throw new UserFriendlyException("User creation failed: " + string.Join(", ", result.Errors));

            await _userManager.AddToRoleAsync(user, "Supervisor");
            await CurrentUnitOfWork.SaveChangesAsync();

            // Step 3: Update Supervisor with UserId
            supervisor.UserId = user.Id;
            await _supervisorRepository.UpdateAsync(supervisor);
            await CurrentUnitOfWork.SaveChangesAsync();

            return ObjectMapper.Map<SupervisorDto>(supervisor);
        }




        public async Task<SupervisorDto> UpdateAsync(UpdateSupervisorDto input)
        {
            var supervisor = await _supervisorRepository.GetAsync(input.Id);
            if (supervisor == null)
            {
                throw new UserFriendlyException("Supervisor not found.");
            }

            var user = await _userManager.FindByIdAsync(supervisor.UserId.ToString());
            if (user == null)
            {
                throw new UserFriendlyException("Linked user not found.");
            }

            user.Name = input.Name;
            user.Surname = input.Surname;
            user.EmailAddress = input.Email;
            user.MunicipalityId = input.MunicipalityId;
            user.MunicipalityName = input.MunicipalityName;
            user.IsActive = true;

            var userUpdateResult = await _userManager.UpdateAsync(user);
            if (!userUpdateResult.Succeeded)
            {
                throw new UserFriendlyException("Failed to update user: " + string.Join(", ", userUpdateResult.Errors));
            }

            ObjectMapper.Map(input, supervisor);
            supervisor.MunicipalityId = input.MunicipalityId;
            supervisor.MunicipalityName = input.MunicipalityName;
            await _supervisorRepository.UpdateAsync(supervisor);

            return ObjectMapper.Map<SupervisorDto>(supervisor);
        }


        public async Task DeleteAsync(Guid id)
        {
            await _supervisorRepository.DeleteAsync(id);
        }
    }
}
