using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.JobCards;
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

        public virtual Guid ReportedByDriverId { get; set; }
        [ForeignKey("ReportedByDriverId")]
        public virtual Driver ReportedByDriver { get; set; }

        public virtual Guid? JobCardId { get; set; }
        [ForeignKey("JobCardId")]
        public virtual JobCard JobCard { get; set; }
    }
}
