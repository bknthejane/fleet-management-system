using System.ComponentModel.DataAnnotations;

namespace FleetManagementSystem.Users.Dto
{
    public class ChangeUserLanguageDto
    {
        [Required]
        public string LanguageName { get; set; }
    }
}