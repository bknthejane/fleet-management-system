using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.Incidents;
using FleetManagementSystem.Domain.Supervisors;
using FleetManagementSystem.Domain.Mechanics;
using FleetManagementSystem.Domain.Vehicles;

namespace FleetManagementSystem.Domain.JobCards
{
    public class JobCard : FullAuditedEntity<Guid>
    {
        public string JobCardNumber { get; set; }
        public DateTime DateOpened { get; set; } = DateTime.UtcNow;
        public string Status { get; set; } = "Open";
        public string Notes { get; set; }
        public string Priority { get; set; } = "Medium";
        public DateTime? DateCompleted { get; set; }

        public Guid IncidentId { get; set; }
        [ForeignKey("IncidentId")]
        public virtual Incident Incident { get; set; }

        public Guid VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual Vehicle Vehicle { get; set; }

        public Guid DriverId { get; set; }
        [ForeignKey("DriverId")]
        public virtual Driver Driver { get; set; }

        public Guid? SupervisorId { get; set; }
        [ForeignKey("SupervisorId")]
        public virtual Supervisor Supervisor { get; set; }

        public Guid? AssignedMechanicId { get; set; }
        [ForeignKey("AssignedMechanicId")]
        public virtual Mechanic AssignedMechanic { get; set; }
    }
}
