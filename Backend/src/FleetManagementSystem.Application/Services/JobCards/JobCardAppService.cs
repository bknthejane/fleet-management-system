using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using FleetManagementSystem.Domain.JobCards;
using FleetManagementSystem.Domain.Incidents;
using FleetManagementSystem.Services.JobCards.Dto;

namespace FleetManagementSystem.Services.JobCards
{
    public class JobCardAppService : ApplicationService, IJobCardAppService
    {
        private readonly IRepository<JobCard, Guid> _jobCardRepository;
        private readonly IRepository<Incident, Guid> _incidentRepository;

        public JobCardAppService(
            IRepository<JobCard, Guid> jobCardRepository,
            IRepository<Incident, Guid> incidentRepository)
        {
            _jobCardRepository = jobCardRepository;
            _incidentRepository = incidentRepository;
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
            var oldStatus = jobCard.Status;

            ObjectMapper.Map(input, jobCard);

            // Handle status changes
            switch (input.Status)
            {
                case "Assigned":
                    jobCard.Status = "Assigned";
                    if (jobCard.IncidentId != Guid.Empty)
                    {
                        var incident = await _incidentRepository.GetAsync(jobCard.IncidentId);
                        incident.Status = "Assigned";
                        await _incidentRepository.UpdateAsync(incident);
                    }
                    break;

                case "Done":
                    jobCard.Status = "Done";
                    jobCard.DateCompleted = DateTime.UtcNow;
                    if (jobCard.IncidentId != Guid.Empty)
                    {
                        var incident = await _incidentRepository.GetAsync(jobCard.IncidentId);
                        incident.Status = "Done";
                        await _incidentRepository.UpdateAsync(incident);
                    }
                    break;

                case "Closed":
                    jobCard.Status = "Closed";
                    jobCard.DateCompleted = DateTime.UtcNow;
                    if (jobCard.IncidentId != Guid.Empty)
                    {
                        var incident = await _incidentRepository.GetAsync(jobCard.IncidentId);
                        incident.Status = "Closed";
                        await _incidentRepository.UpdateAsync(incident);
                    }
                    break;

                default:
                    break;
            }

            await _jobCardRepository.UpdateAsync(jobCard);
            return ObjectMapper.Map<JobCardDto>(jobCard);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _jobCardRepository.DeleteAsync(id);
        }
    }
}
