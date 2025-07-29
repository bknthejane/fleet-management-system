using FleetManagementSystem.Debugging;

namespace FleetManagementSystem
{
    public class FleetManagementSystemConsts
    {
        public const string LocalizationSourceName = "FleetManagementSystem";

        public const string ConnectionStringName = "Default";

        public const bool MultiTenancyEnabled = true;


        /// <summary>
        /// Default pass phrase for SimpleStringCipher decrypt/encrypt operations
        /// </summary>
        public static readonly string DefaultPassPhrase =
            DebugHelper.IsDebug ? "gsKxGZ012HLL3MI5" : "d3cab95debfd4b2387437b7e60b00f83";
    }
}
