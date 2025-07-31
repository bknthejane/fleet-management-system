using Abp.AutoMapper;
using FleetManagementSystem.Domain.Incidents;

namespace FleetManagementSystem.Services.Incidents.Dto
{
    [AutoMap(typeof(Incident))]
    public class IncidentTypeDto
    {
        public string Type { get; set; }
        public string Department { get; set; }
    }
}
