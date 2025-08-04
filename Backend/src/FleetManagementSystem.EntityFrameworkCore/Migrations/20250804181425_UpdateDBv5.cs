using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv5 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Drivers_AssignedVehicleId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "AssignedDriverName",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "MunicipalityName",
                table: "Vehicles");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_AssignedDriverId",
                table: "Vehicles",
                column: "AssignedDriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_AssignedVehicleId",
                table: "Drivers",
                column: "AssignedVehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Drivers_AssignedDriverId",
                table: "Vehicles",
                column: "AssignedDriverId",
                principalTable: "Drivers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Drivers_AssignedDriverId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_AssignedDriverId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_AssignedVehicleId",
                table: "Drivers");

            migrationBuilder.AddColumn<string>(
                name: "AssignedDriverName",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MunicipalityName",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_AssignedVehicleId",
                table: "Drivers",
                column: "AssignedVehicleId",
                unique: true);
        }
    }
}
