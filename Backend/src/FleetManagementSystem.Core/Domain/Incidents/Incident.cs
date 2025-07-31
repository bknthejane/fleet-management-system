using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.JobCards;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Domain.Vehicles;

namespace FleetManagementSystem.Domain.Incidents
{
    public class Incident : FullAuditedEntity<Guid>
    {
        public virtual string Description { get; set; }
        public virtual string IncidentType { get; set; }

        public virtual DateTime DateReported { get; set; } = DateTime.UtcNow;

        public virtual Guid VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual Vehicle Vehicle { get; set; }

        public virtual Guid DriverId { get; set; }
        [ForeignKey("DriverId")]
        public virtual Driver Driver { get; set; }

        public virtual Guid MunicipalityId { get; set; }
        [ForeignKey("MunicipalityId")]
        public virtual Municipality Municipality { get; set; }
    }
}
