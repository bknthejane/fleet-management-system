using System.Threading.Tasks;
using FleetManagementSystem.Models.TokenAuth;
using FleetManagementSystem.Web.Controllers;
using Shouldly;
using Xunit;

namespace FleetManagementSystem.Web.Tests.Controllers
{
    public class HomeController_Tests: FleetManagementSystemWebTestBase
    {
        [Fact]
        public async Task Index_Test()
        {
            await AuthenticateAsync(null, new AuthenticateModel
            {
                UserNameOrEmailAddress = "admin",
                Password = "123qwe"
            });

            //Act
            var response = await GetResponseAsStringAsync(
                GetUrl<HomeController>(nameof(HomeController.Index))
            );

            //Assert
            response.ShouldNotBeNullOrEmpty();
        }
    }
}