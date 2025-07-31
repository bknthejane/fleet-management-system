using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Vehicles;

namespace FleetManagementSystem.Services.Vehicles.Dto
{
    [AutoMap(typeof(Vehicle))]
    public class UpdateVehicleDto : CreateVehicleDto
    {
        public Guid Id { get; set; }
    }
}
