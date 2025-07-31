using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Drivers;

namespace FleetManagementSystem.Services.Drivers.Dto
{
    [AutoMap(typeof(Driver))]
    public class UpdateDriverDto : CreateDriverDto
    {
        public Guid Id { get; set; }
    }
}
