using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using FleetManagementSystem.Services.JobCards.Dto;

namespace FleetManagementSystem.Services.JobCards
{
    public interface IJobCardAppService : IApplicationService
    {
        Task<List<JobCardDto>> GetAllAsync();
        Task<JobCardDto> GetAsync(Guid id);
        Task<JobCardDto> CreateAsync(CreateJobCardDto input);
        Task<JobCardDto> UpdateAsync(JobCardDto input);
        Task DeleteAsync(Guid id);

        Task AssignToMechanicAsync(Guid jobCardId, Guid mechanicId);
        Task MarkAsDoneAsync(Guid jobCardId);
        Task CloseJobCardAsync(Guid jobCardId);
    }
}
