using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Incidents;

namespace FleetManagementSystem.Services.Incidents.Dto
{
    [AutoMap(typeof(Incident))]
    public class IncidentDto : CreateIncidentDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string IncidentType { get; set; }
        public string Department { get; set; }
        public string Status { get; set; }
        public DateTime DateReported { get; set; }

        public Guid? JobCardId { get; set; }
    }
}
