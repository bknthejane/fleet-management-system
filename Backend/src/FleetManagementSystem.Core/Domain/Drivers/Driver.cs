using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Authorization.Users;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Domain.Vehicles;

namespace FleetManagementSystem.Domain.Drivers
{
    public class Driver : FullAuditedEntity<Guid>
    {
        public virtual string Name { get; set; }
        public virtual string Surname { get; set; }
        public virtual Guid MunicipalityId { get; set; }
        [ForeignKey("MunicipalityId")]

        public virtual string MunicipalityName { get; set; }
        public virtual Municipality Municipality { get; set; }

        public virtual Guid? AssignedVehicleId { get; set; }
        [ForeignKey("AssignedVehicleId")]
        public virtual Vehicle AssignedVehicle { get; set; }

        public virtual long? UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}
