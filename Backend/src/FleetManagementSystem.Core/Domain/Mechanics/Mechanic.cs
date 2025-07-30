using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Domain.Supervisors;

namespace FleetManagementSystem.Domain.Mechanics
{
    public class Mechanic : FullAuditedEntity<Guid>
    {
        public virtual string Specialization { get; set; }

        public virtual Guid SupervisorId { get; set; }
        [ForeignKey("SupervisorId")]
        public virtual Supervisor Supervisor { get; set; }

        public virtual Guid MunicipalityId { get; set; }
        [ForeignKey("MunicipalityId")]
        public virtual Municipality Municipality { get; set; }

        public virtual Guid? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
