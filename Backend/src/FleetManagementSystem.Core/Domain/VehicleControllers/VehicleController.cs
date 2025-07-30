using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Municipalities;

namespace FleetManagementSystem.Domain.VehicleControllers
{
    public class VehicleController : FullAuditedEntity<Guid>
    {
        public virtual Guid MunicipalityId { get; set; }
        [ForeignKey("MunicipalityId")]
        public virtual Municipality Municipality { get; set; }

        public virtual Guid? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
