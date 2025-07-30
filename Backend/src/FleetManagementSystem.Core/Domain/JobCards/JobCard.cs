using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.Incidents;
using FleetManagementSystem.Domain.Supervisors;
using FleetManagementSystem.Domain.Vehicles;

namespace FleetManagementSystem.Domain.JobCards
{
    public class JobCard : FullAuditedEntity<Guid>
    {
        public virtual string JobCardNumber { get; set; }
        public virtual DateTime DateOpened { get; set; } = DateTime.UtcNow;
        public virtual string Status { get; set; } = "Open";
        public virtual string Notes { get; set; }

        public virtual Guid IncidentId { get; set; }
        [ForeignKey("IncidentId")]
        public virtual Incident Incident { get; set; }

        public virtual Guid VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual Vehicle Vehicle { get; set; }

        public virtual Guid DriverId { get; set; }
        [ForeignKey("DriverId")]
        public virtual Driver Driver { get; set; }

        public virtual Guid? SupervisorId { get; set; }
        [ForeignKey("SupervisorId")]
        public virtual Supervisor Supervisor { get; set; }

        public virtual DateTime? DateCompleted { get; set; }
        public virtual decimal? EstimatedCost { get; set; }
        public virtual decimal? ActualCost { get; set; }

        public virtual string Priority { get; set; } = "Medium";
    }
}
