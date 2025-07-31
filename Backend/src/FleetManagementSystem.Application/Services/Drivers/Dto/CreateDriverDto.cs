using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Drivers;

namespace FleetManagementSystem.Services.Drivers.Dto
{
    [AutoMap(typeof(Driver))]
    public class CreateDriverDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public Guid MunicipalityId { get; set; }
        public Guid? AssignedVehicleId { get; set; }

        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
