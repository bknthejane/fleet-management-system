using System;
using Abp.Domain.Entities.Auditing;

namespace FleetManagementSystem.Domain.Municipalities
{
    public class Municipality : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }
        public virtual string Address { get; set; }
        public virtual string ContactPerson { get; set; }
        public virtual string Email { get; set; }
        public virtual string ContactNumber { get; set; }
    }
}
