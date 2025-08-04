using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Mechanics;

namespace FleetManagementSystem.Services.Mechanics.Dto
{
    [AutoMap(typeof(Mechanic))]
    public class CreateMechanicDto
    {
        public Guid SupervisorId { get; set; }
        public Guid MunicipalityId { get; set; }
        public string MunicipalityName { get; set; }

        public string Name { get; set; }
        public string Surname { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
    }
}
