using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Incidents;

namespace FleetManagementSystem.Services.Incidents.Dto
{
    [AutoMap(typeof(Incident))]
    public class UpdateIncidentDto : CreateIncidentDto
    {
        public Guid Id { get; set; }
        public string IncidentType { get; set; }
        public string Description { get; set; }
        public Guid MunicipalityId { get; set; }
        public string Status { get; set; }
    }
}
