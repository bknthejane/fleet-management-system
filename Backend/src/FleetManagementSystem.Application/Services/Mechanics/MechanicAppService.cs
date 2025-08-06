using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FleetManagementSystem.Authorization.Roles;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.JobCards;
using FleetManagementSystem.Domain.Mechanics;
using FleetManagementSystem.Domain.Supervisors;
using FleetManagementSystem.Services.Mechanics.Dto;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace FleetManagementSystem.Services.Mechanics
{
    public class MechanicAppService : ApplicationService, IMechanicAppService
    {
        private readonly IRepository<Mechanic, Guid> _mechanicRepository;
        private readonly IRepository<Supervisor, Guid> _supervisorRepository;
        private readonly IRepository<JobCard, Guid> _jobCardRepository;
        private readonly UserManager<User> _userManager;
        private readonly RoleManager<Role> _roleManager;

        public MechanicAppService(
            IRepository<Mechanic, Guid> mechanicRepository,
            IRepository<Supervisor, Guid> supervisorRepository,
            IRepository<JobCard, Guid> jobCardRepository,
            UserManager<User> userManager,
            RoleManager<Role> roleManager)
        {
            _mechanicRepository = mechanicRepository;
            _supervisorRepository = supervisorRepository;
            _jobCardRepository = jobCardRepository;
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task<List<MechanicDto>> GetAllAsync()
        {
            var mechanics = await _mechanicRepository
                .GetAllIncluding(m => m.AssignedJobCard)
                .ToListAsync();

            return ObjectMapper.Map<List<MechanicDto>>(mechanics);
        }

        public async Task<MechanicDto> GetAsync(Guid id)
        {
            var mechanic = await _mechanicRepository
                .GetAllIncluding(m => m.AssignedJobCard, m => m.Supervisor)
                .FirstOrDefaultAsync(m => m.Id == id);

            if (mechanic == null)
                throw new UserFriendlyException("Mechanic not found.");

            var dto = ObjectMapper.Map<MechanicDto>(mechanic);
            dto.SupervisorName = mechanic.Supervisor?.Name;
            dto.AssignedJobCardNumber = mechanic.AssignedJobCard?.JobCardNumber;

            return dto;
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
                MunicipalityId = input.MunicipalityId,
                MunicipalityName = input.MunicipalityName,
            };

            var result = await _userManager.CreateAsync(user, input.Password);
            if (!result.Succeeded)
                throw new UserFriendlyException("User creation failed: " + string.Join(", ", result.Errors.Select(e => e.Description)));

            var roleName = "Mechanic";
            if (!await _roleManager.RoleExistsAsync(roleName))
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
            if (supervisor == null)
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
            if (mechanic == null)
                throw new UserFriendlyException("Mechanic not found.");

            ObjectMapper.Map(input, mechanic);

            var supervisor = await _supervisorRepository.GetAsync(input.SupervisorId);
            if (supervisor == null)
                throw new UserFriendlyException("Supervisor not found.");

            mechanic.Department = supervisor.Department;

            var user = await _userManager.FindByIdAsync(mechanic.UserId.ToString());
            if (user == null)
                throw new UserFriendlyException("Linked user not found.");

            user.Name = input.Name;
            user.Surname = input.Surname;
            user.MunicipalityId = input.MunicipalityId;
            user.MunicipalityName = input.MunicipalityName;

            var userUpdateResult = await _userManager.UpdateAsync(user);
            if (!userUpdateResult.Succeeded)
                throw new UserFriendlyException("Failed to update user: " + string.Join(", ", userUpdateResult.Errors.Select(e => e.Description)));

            // 🛠 Handle Job Card assignment
            if (input.AssignedJobCardId.HasValue)
            {
                var jobCard = await _jobCardRepository.FirstOrDefaultAsync(input.AssignedJobCardId.Value);
                if (jobCard == null)
                    throw new UserFriendlyException("Assigned job card not found.");

                jobCard.AssignedMechanicId = mechanic.Id;
                await _jobCardRepository.UpdateAsync(jobCard);

                mechanic.AssignedJobCardId = jobCard.Id;
            }
            else
            {
                mechanic.AssignedJobCardId = null;
            }

            await _mechanicRepository.UpdateAsync(mechanic);
            await CurrentUnitOfWork.SaveChangesAsync();

            return await GetAsync(mechanic.Id);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _mechanicRepository.DeleteAsync(id);
        }
    }
}
