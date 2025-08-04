using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Supervisors;

namespace FleetManagementSystem.Services.Supervisors.Dto
{
    [AutoMap(typeof(Supervisor))]
    public class CreateSupervisorDto
    {
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
        public string Department { get; set; }
        public Guid MunicipalityId { get; set; }
        public string MunicipalityName { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }
    }
}
