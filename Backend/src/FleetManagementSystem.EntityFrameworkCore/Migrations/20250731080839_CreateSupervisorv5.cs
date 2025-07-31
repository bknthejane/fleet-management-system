using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class CreateSupervisorv5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_AbpUsers_MunicipalityId",
                table: "AbpUsers",
                column: "MunicipalityId");

            migrationBuilder.AddForeignKey(
                name: "FK_AbpUsers_Municipalities_MunicipalityId",
                table: "AbpUsers",
                column: "MunicipalityId",
                principalTable: "Municipalities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AbpUsers_Municipalities_MunicipalityId",
                table: "AbpUsers");

            migrationBuilder.DropIndex(
                name: "IX_AbpUsers_MunicipalityId",
                table: "AbpUsers");
        }
    }
}
