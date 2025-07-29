using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace FleetManagementSystem.Localization
{
    public static class FleetManagementSystemLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(FleetManagementSystemConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(FleetManagementSystemLocalizationConfigurer).GetAssembly(),
                        "FleetManagementSystem.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
