using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.JobCards;
using FleetManagementSystem.Domain.Municipalities;

namespace FleetManagementSystem.Domain.Supervisors
{
    public class Supervisor : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }
        public virtual string Surname { get; set; }
        public virtual string Email { get; set; }
        public virtual string ContactNumber { get; set; }
        public virtual string Department { get; set; }

        public virtual Guid MunicipalityId { get; set; }

        [ForeignKey("MunicipalityId")]
        public virtual string MunicipalityName { get; set; }
        public virtual Municipality Municipality { get; set; }

        public virtual long? UserId { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public virtual List<JobCard> JobCards { get; set; } = new List<JobCard>();
    }
}
