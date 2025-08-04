using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Incidents;

namespace FleetManagementSystem.Services.Incidents.Dto
{
    [AutoMap(typeof(Incident))]
    public class CreateIncidentDto
    {
        public string Description { get; set; }
        public string IncidentType { get; set; }
        public Guid VehicleId { get; set; }
        public Guid DriverId { get; set; }
        public Guid MunicipalityId { get; set; }
        public string MunicipalityName { get; set; }
        public string Department { get; set; }
    }
}
