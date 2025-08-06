using System;
using System.Collections.Generic;
using Abp.Authorization.Users;
using Abp.Extensions;
using FleetManagementSystem.Domain.Drivers;
using FleetManagementSystem.Domain.Municipalities;
using FleetManagementSystem.Domain.Supervisors;

namespace FleetManagementSystem.Authorization.Users
{
    public class User : AbpUser<User>
    {
        public virtual Guid? MunicipalityId { get; set; }
        public virtual string MunicipalityName { get; set; }
        public virtual Municipality Municipality { get; set; }

        public virtual Guid? SupervisorId { get; set; }
        public virtual string SupervisorName { get; set; }
        public virtual Supervisor Supervisor { get; set; }

        public Guid? DriverId { get; set; }
        public string DriverName { get; set; }
        public virtual Driver Driver { get; set; }

        public Guid? AssignedVehicleId { get; set; }


        public const string DefaultPassword = "123qwe";

        public static string CreateRandomPassword()
        {
            return Guid.NewGuid().ToString("N").Truncate(16);
        }

        public static User CreateTenantAdminUser(int tenantId, string emailAddress)
        {
            var user = new User
            {
                TenantId = tenantId,
                UserName = AdminUserName,
                Name = AdminUserName,
                Surname = AdminUserName,
                EmailAddress = emailAddress,
                Roles = new List<UserRole>()
            };

            user.SetNormalizedNames();

            return user;
        }
    }
}
