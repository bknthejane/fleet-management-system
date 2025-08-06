using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.JobCards;

namespace FleetManagementSystem.Services.JobCards.Dto
{
    [AutoMap(typeof(JobCard))]
    public class JobCardDto : CreateJobCardDto
    {
        public Guid Id { get; set; }
        public string JobCardNumber { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
        public DateTime DateOpened { get; set; }
        public DateTime? DateCompleted { get; set; }
        public Guid? AssignedMechanicId { get; set; }
    }
}
