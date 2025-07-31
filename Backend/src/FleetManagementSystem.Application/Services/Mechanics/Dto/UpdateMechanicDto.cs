using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Mechanics;

namespace FleetManagementSystem.Services.Mechanics.Dto
{
    [AutoMap(typeof(Mechanic))]
    public class UpdateMechanicDto
    {
        public Guid Id { get; set; }
    }
}
