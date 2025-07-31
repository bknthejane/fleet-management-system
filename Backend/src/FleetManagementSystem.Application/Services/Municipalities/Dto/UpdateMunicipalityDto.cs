using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Municipalities;

namespace FleetManagementSystem.Services.Municipalities.Dto
{
    [AutoMap(typeof(Municipality))]
    public class UpdateMunicipalityDto : CreateMunicipalityDto
    {
        public Guid Id { get; set; }
    }
}
