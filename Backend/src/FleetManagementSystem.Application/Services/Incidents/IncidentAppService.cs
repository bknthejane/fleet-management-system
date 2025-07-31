using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using FleetManagementSystem.Domain.Incidents;
using FleetManagementSystem.Domain.JobCards;
using FleetManagementSystem.Services.Incidents.Dto;

namespace FleetManagementSystem.Services.Incidents
{
    public class IncidentAppService : ApplicationService, IIncidentAppService
    {
        private readonly IRepository<Incident, Guid> _incidentRepository;
        private readonly IRepository<JobCard, Guid> _jobCardRepository;

        public IncidentAppService(IRepository<Incident, Guid> incidentRepository, IRepository<JobCard, Guid> jobCardRepository)
        {
            _incidentRepository = incidentRepository;
            _jobCardRepository = jobCardRepository;
        }

        public async Task<List<IncidentDto>> GetAllAsync()
        {
            var entities = await _incidentRepository.GetAllListAsync();
            return ObjectMapper.Map<List<IncidentDto>>(entities);
        }

        public async Task<IncidentDto> GetAsync(Guid id)
        {
            var entity = await _incidentRepository.GetAsync(id);
            return ObjectMapper.Map<IncidentDto>(entity);
        }

        public async Task<IncidentDto> CreateAsync(CreateIncidentDto input)
        {
            var incident = ObjectMapper.Map<Incident>(input);
            incident.Id = Guid.NewGuid();

            await _incidentRepository.InsertAsync(incident);

            var jobCard = new JobCard
            {
                Id = Guid.NewGuid(),
                IncidentId = incident.Id,
                Status = "Open",
                Notes = "Job card auto created from incident"
            };

            await _jobCardRepository.InsertAsync(jobCard);

            return ObjectMapper.Map<IncidentDto>(incident);
        }

        public async Task<IncidentDto> UpdateAsync(UpdateIncidentDto input)
        {
            var entity = await _incidentRepository.GetAsync(input.Id);
            ObjectMapper.Map(input, entity);
            await _incidentRepository.UpdateAsync(entity);

            return ObjectMapper.Map<IncidentDto>(entity);
        }

        public async Task DeleteAsync(Guid id)
        {
            await _incidentRepository.DeleteAsync(id);
        }
    }
}
