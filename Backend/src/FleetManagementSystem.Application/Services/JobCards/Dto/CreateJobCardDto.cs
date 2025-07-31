using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.JobCards;

namespace FleetManagementSystem.Services.JobCards.Dto
{
    [AutoMap(typeof(JobCard))]
    public class CreateJobCardDto
    {
        public Guid IncidentId { get; set; }
        public Guid VehicleId { get; set; }
        public Guid DriverId { get; set; }
        public Guid? SupervisorId { get; set; }
        public string Notes { get; set; }
    }
}
