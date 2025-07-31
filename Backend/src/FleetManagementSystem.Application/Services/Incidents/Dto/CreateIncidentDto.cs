using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FleetManagementSystem.Services.Incidents.Dto
{
    public class CreateIncidentDto
    {
        public string Description { get; set; }
        public string Type { get; set; }
        public Guid VehicleId { get; set; }
        public Guid DriverId { get; set; }
        public Guid MunicipalityId { get; set; }
    }
}
