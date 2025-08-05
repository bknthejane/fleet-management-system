using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.Municipalities;

namespace FleetManagementSystem.Domain.Vehicles
{
    public class Vehicle : FullAuditedEntity<Guid>
    {
        public virtual string FleetNumber { get; set; }
        public virtual string RegistrationNumber { get; set; }
        public virtual string Model { get; set; }
        public virtual string Make { get; set; }
        public virtual DateTime LicenseExpiry { get; set; }
        public virtual bool IsActive { get; set; } = true;

        // Municipality
        public virtual Guid MunicipalityId { get; set; }
        [ForeignKey("MunicipalityId")]
        public virtual string MunicipalityName { get; set; } // Stored in DB
        public virtual Municipality Municipality { get; set; }

        // Driver Assignment
        public virtual Guid? AssignedDriverId { get; set; }
        [ForeignKey("AssignedDriverId")]
        public virtual Driver AssignedDriver { get; set; }

        // ✅ Store Driver Name in DB for quick lookup
        public virtual string AssignedDriverName { get; set; }
    }
}
