using Abp.AutoMapper;
using FleetManagementSystem.Domain.Municipalities;

namespace FleetManagementSystem.Services.Municipalities.Dto
{
    [AutoMap(typeof(Municipality))]
    public class CreateMunicipalityDto
    {
        public string Name { get; set; }
        public string Address { get; set; }
        public string ContactPerson { get; set; }
        public string Email { get; set; }
        public string ContactNumber { get; set; }

        public string AdminUserName { get; set; }
        public string AdminEmail { get; set; }
        public string AdminPassword { get; set; }

    }
}
