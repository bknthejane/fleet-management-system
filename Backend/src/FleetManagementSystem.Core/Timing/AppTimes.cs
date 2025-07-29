using System;
using Abp.Dependency;

namespace FleetManagementSystem.Timing
{
    public class AppTimes : ISingletonDependency
    {
        private DateTime _startupTime;

        /// <summary>
        /// Gets the startup time of the application (UTC).
        /// </summary>
        public DateTime StartupTime
        {
            get => _startupTime;
            set => _startupTime = DateTime.SpecifyKind(value, DateTimeKind.Utc);
        }

        public AppTimes()
        {
            StartupTime = DateTime.UtcNow;
        }
    }
}
