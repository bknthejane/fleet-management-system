using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Drivers;

namespace FleetManagementSystem.Services.Drivers.Dto
{
    [AutoMap(typeof(Driver))]
    public class DriverDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public Guid MunicipalityId { get; set; }
        public string MunicipalityName { get; set; }
        public Guid? AssignedVehicleId { get; set; }
        public long? UserId { get; set; }
    }
}
