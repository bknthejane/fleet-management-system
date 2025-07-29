using Abp.Authorization;
using FleetManagementSystem.Authorization.Roles;
using FleetManagementSystem.Authorization.Users;

namespace FleetManagementSystem.Authorization
{
    public class PermissionChecker : PermissionChecker<Role, User>
    {
        public PermissionChecker(UserManager userManager)
            : base(userManager)
        {
        }
    }
}
