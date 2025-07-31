using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Incidents;

namespace FleetManagementSystem.Services.Incidents.Dto
{
    [AutoMap(typeof(Incident))]
    public class UpdateIncidentDto : CreateIncidentDto
    {
        public Guid Id { get; set; }
    }
}
