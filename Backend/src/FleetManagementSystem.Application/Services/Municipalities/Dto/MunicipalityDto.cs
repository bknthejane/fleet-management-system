using System;
using Abp.Application.Services.Dto;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Municipalities;

namespace FleetManagementSystem.Services.Municipalities.Dto
{
    [AutoMap(typeof(Municipality))]
    public class MunicipalityDto : EntityDto<Guid>
    {
        public  string Name { get; set; }
        public string Address { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }
    }
}
