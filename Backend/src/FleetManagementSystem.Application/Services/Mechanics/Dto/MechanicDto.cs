using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Mechanics;

namespace FleetManagementSystem.Services.Mechanics.Dto
{
    [AutoMap(typeof(Mechanic))]
    public class MechanicDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string Department { get; set; }
        public Guid SupervisorId { get; set; }
        public string SupervisorName { get; set; }
        public Guid MunicipalityId { get; set; }
        public string MunicipalityName { get; set; }
        public Guid? AssignedJobCardId { get; set; }
        public string AssignedJobCardNumber { get; set; }
        public long? UserId { get; set; }
    }
}
