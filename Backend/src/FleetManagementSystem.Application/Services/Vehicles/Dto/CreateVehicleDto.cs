using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Vehicles;

namespace FleetManagementSystem.Services.Vehicles.Dto
{
    [AutoMap(typeof(Vehicle))]
    public class CreateVehicleDto
    {
        public string FleetNumber { get; set; }
        public string RegistrationNumber { get; set; }
        public string Model { get; set; }
        public string Make { get; set; }
        public DateTime LicenseExpiry { get; set; }
        public Guid MunicipalityId { get; set; }
    }
}
