using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.JobCards;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Domain.Supervisors;
using FleetManagementSystem.Domain.Vehicles;

namespace FleetManagementSystem.Domain.Mechanics
{
    public class Mechanic : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }
        public virtual string Surname { get; set; }
        public virtual string Email { get; set; }
        public virtual string ContactNumber { get; set; }
        public virtual string Department { get; set; }

        public virtual Guid SupervisorId { get; set; }
        [ForeignKey("SupervisorId")]
        public virtual Supervisor Supervisor { get; set; }

        public virtual Guid MunicipalityId { get; set; }
        [ForeignKey("MunicipalityId")]

        public virtual string MunicipalityName { get; set; }
        public virtual Municipality Municipality { get; set; }

        public virtual Guid? AssignedJobCardId { get; set; }
        [ForeignKey("AssignedJobCardId")]
        public virtual JobCard AssignedJobCard { get; set; }

        public virtual long? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
