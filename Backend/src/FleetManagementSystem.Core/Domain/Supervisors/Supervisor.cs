using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Municipalities;

namespace FleetManagementSystem.Domain.Supervisors
{
    public class Supervisor : FullAuditedEntity<Guid>
    {
        public virtual string Department { get; set; }

        public virtual Guid MunicipalityId { get; set; }
        [ForeignKey("MunicipalityId")]
        public virtual Municipality Municipality { get; set; }

        public virtual Guid? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
