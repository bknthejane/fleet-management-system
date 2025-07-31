using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Abp.Application.Services;
using Abp.Domain.Repositories;
using Abp.UI;
using FleetManagementSystem.Domain.Incidents;
using FleetManagementSystem.Domain.JobCards;
using FleetManagementSystem.Domain.Supervisors;
using FleetManagementSystem.Services.Incidents.Dto;

namespace FleetManagementSystem.Services.Incidents
{
    public class IncidentAppService : ApplicationService, IIncidentAppService
    {
        private readonly IRepository<Incident, Guid> _incidentRepository;
        private readonly IRepository<JobCard, Guid> _jobCardRepository;
        private readonly IRepository<Supervisor, Guid> _supervisorRepository;

        private static readonly List<(string Type, string Department)> IncidentTypes = new()
        {
            ("Engine Failure", "Maintenance"),
            ("Body Damage", "Fabrication"),
            ("Electrical Issue", "Diverse Workshop Support"),
            ("Routine Service", "Maintenance"),
            ("Flat Tire", "Maintenance"),
            ("Tire Replacement", "Maintenance"),
            ("Wheel Alignment", "Maintenance")
        };

        public IncidentAppService(
            IRepository<Incident, Guid> incidentRepository,
            IRepository<JobCard, Guid> jobCardRepository,
            IRepository<Supervisor, Guid> supervisorRepository)
        {
            _incidentRepository = incidentRepository;
            _jobCardRepository = jobCardRepository;
            _supervisorRepository = supervisorRepository;
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

        public async Task<List<IncidentTypeDto>> GetIncidentTypesAsync()
        {
            return IncidentTypes
                .Select(t => new IncidentTypeDto
                {
                    Type = t.Type,
                    Department = t.Department
                })
                .ToList();
        }
        public async Task<IncidentDto> CreateAsync(CreateIncidentDto input)
        {
            var mapping = IncidentTypes.FirstOrDefault(t => t.Type == input.IncidentType);
            if (mapping == default)
                throw new UserFriendlyException("Invalid Incident Type");

            var incident = ObjectMapper.Map<Incident>(input);
            incident.Id = Guid.NewGuid();
            incident.Department = mapping.Department;
            incident.DateReported = DateTime.UtcNow;

            await _incidentRepository.InsertAsync(incident);

            var supervisor = _supervisorRepository.GetAll()
                .FirstOrDefault(s => s.Department == mapping.Department && s.MunicipalityId == input.MunicipalityId);

            if (supervisor == null)
                throw new UserFriendlyException($"No supervisor found for department: {mapping.Department}");

            var jobCard = new JobCard
            {
                Id = Guid.NewGuid(),
                JobCardNumber = $"JC-{DateTime.UtcNow:yyyyMMddHHmmss}",
                IncidentId = incident.Id,
                VehicleId = input.VehicleId,
                DriverId = input.DriverId,
                SupervisorId = supervisor.Id,
                Status = "Open",
                Notes = $"Job card auto-created from incident: {incident.Description ?? "No additional notes"}",
                Priority = "Medium",
                DateOpened = DateTime.UtcNow
            };

            await _jobCardRepository.InsertAsync(jobCard);

            var dto = ObjectMapper.Map<IncidentDto>(incident);
            dto.JobCardId = jobCard.Id;

            return dto;
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
