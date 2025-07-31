using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.Incidents;

namespace FleetManagementSystem.Services.Incidents.Dto
{
    [AutoMap(typeof(Incident))]
    public class UpdateIncidentDto : CreateIncidentDto
    {
        public Guid Id { get; set; }
    }
}
