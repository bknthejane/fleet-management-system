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
    public class IncidentDto
    {
        public Guid Id { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public DateTime DateReported { get; set; }
        public Guid VehicleId { get; set; }
        public Guid DriverId { get; set; }
        public Guid MunicipalityId { get; set; }
    }
}
