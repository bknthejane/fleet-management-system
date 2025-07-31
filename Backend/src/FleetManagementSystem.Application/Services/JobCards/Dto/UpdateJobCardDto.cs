using System;
using Abp.AutoMapper;
using FleetManagementSystem.Domain.JobCards;

namespace FleetManagementSystem.Services.JobCards.Dto
{
    [AutoMap(typeof(JobCard))]
    public class UpdateJobCardDto : CreateJobCardDto
    {
        public Guid Id { get; set; }
        public string Status { get; set; }
        public string Priority { get; set; }
    }
}
