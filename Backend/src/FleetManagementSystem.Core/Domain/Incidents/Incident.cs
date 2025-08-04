using System;
using System.ComponentModel.DataAnnotations.Schema;
using Abp.Domain.Entities.Auditing;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Domain.Vehicles;

namespace FleetManagementSystem.Domain.Incidents
{
    public class Incident : FullAuditedEntity<Guid>
    {
        public string Description { get; set; }
        public string IncidentType { get; set; }
        public string Department { get; set; }
        public DateTime DateReported { get; set; } = DateTime.UtcNow;

        public Guid VehicleId { get; set; }
        [ForeignKey("VehicleId")]
        public virtual Vehicle Vehicle { get; set; }

        public Guid DriverId { get; set; }
        [ForeignKey("DriverId")]
        public virtual Driver Driver { get; set; }

        public Guid MunicipalityId { get; set; }
        [ForeignKey("MunicipalityId")]

        public virtual string MunicipalityName { get; set; }
        public virtual Municipality Municipality { get; set; }
    }
}
