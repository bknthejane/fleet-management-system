using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Drivers;

namespace FleetManagementSystem.Services.Drivers.Dto
{
    [AutoMap(typeof(Driver))]
    public class UpdateDriverDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string ContactNumber { get; set; }
        public string Department { get; set; }

        public Guid MunicipalityId { get; set; }
        public string MunicipalityName { get; set; }

        public Guid? AssignedVehicleId { get; set; }
    }

}
