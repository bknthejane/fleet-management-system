using System;
using Abp.AutoMapper;
using Abp.Domain.Entities;
using FleetManagementSystem.Domain.Supervisors;

namespace FleetManagementSystem.Services.Supervisors.Dto
{
    [AutoMap(typeof(Supervisor))]
    public class SupervisorDto : Entity<Guid>
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Department { get; set; }
        public Guid MunicipalityId { get; set; }
        public long? UserId { get; set; }
    }
}
