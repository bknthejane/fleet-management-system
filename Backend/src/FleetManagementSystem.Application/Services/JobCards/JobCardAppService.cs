using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using FleetManagementSystem.Domain.JobCards;
using FleetManagementSystem.Services.JobCards.Dto;

namespace FleetManagementSystem.Services.JobCards
{
    public class JobCardAppService : ApplicationService, IJobCardAppService
    {
        private readonly IRepository<JobCard, Guid> _jobCardRepository;

        public JobCardAppService(IRepository<JobCard, Guid> jobCardRepository)
        {
            _jobCardRepository = jobCardRepository;
        }

        public async Task<List<JobCardDto>> GetAllAsync()
        {
            var entities = await _jobCardRepository.GetAllListAsync();
            return ObjectMapper.Map<List<JobCardDto>>(entities);
        }

        public async Task<JobCardDto> GetAsync(Guid id)
        {
            var entity = await _jobCardRepository.GetAsync(id);
            return ObjectMapper.Map<JobCardDto>(entity);
        }

        public async Task<JobCardDto> CreateAsync(CreateJobCardDto input)
        {
            var jobCard = ObjectMapper.Map<JobCard>(input);
            jobCard.Id = Guid.NewGuid();
            jobCard.JobCardNumber = $"JC-{DateTime.UtcNow:yyyyMMddHHmmss}";
            jobCard.Status = "Open";
            jobCard.DateOpened = DateTime.UtcNow;

            await _jobCardRepository.InsertAsync(jobCard);
            return ObjectMapper.Map<JobCardDto>(jobCard);
        }

        public async Task<JobCardDto> UpdateAsync(JobCardDto input)
        {
            var jobCard = await _jobCardRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, jobCard);
            await _jobCardRepository.UpdateAsync(jobCard);
            return ObjectMapper.Map<JobCardDto>(jobCard);
        }

        public async Task AssignToMechanicAsync(Guid jobCardId, Guid mechanicId)
        {
            var jobCard = await _jobCardRepository.GetAsync(jobCardId);
            jobCard.AssignedMechanicId = mechanicId;
            jobCard.Status = "In Progress";
            await _jobCardRepository.UpdateAsync(jobCard);
        }

        public async Task MarkAsDoneAsync(Guid jobCardId)
        {
            var jobCard = await _jobCardRepository.GetAsync(jobCardId);
            jobCard.Status = "Done";
            jobCard.DateCompleted = DateTime.UtcNow;
            await _jobCardRepository.UpdateAsync(jobCard);
        }

        public async Task CloseJobCardAsync(Guid jobCardId)
        {
            var jobCard = await _jobCardRepository.GetAsync(jobCardId);
            jobCard.Status = "Closed";
            jobCard.DateCompleted = DateTime.UtcNow;
            await _jobCardRepository.UpdateAsync(jobCard);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _jobCardRepository.DeleteAsync(id);
        }
    }

}
