using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Supervisors;

namespace FleetManagementSystem.Services.Supervisors.Dto
{
    [AutoMap(typeof(Supervisor))]
    public class UpdateSupervisorDto
    {
        public Guid Id { get; set; }
    }
}
