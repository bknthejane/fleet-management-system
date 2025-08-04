using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv4 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vehicles_Drivers_AssignedDriverId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_AssignedDriverId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "AssignedVehicleName",
                table: "Drivers");

            migrationBuilder.AddColumn<string>(
                name: "AssignedDriverName",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_AssignedVehicleId",
                table: "Drivers",
                column: "AssignedVehicleId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Vehicles_AssignedVehicleId",
                table: "Drivers",
                column: "AssignedVehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Vehicles_AssignedVehicleId",
                table: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_AssignedVehicleId",
                table: "Drivers");

            migrationBuilder.DropColumn(
                name: "AssignedDriverName",
                table: "Vehicles");

            migrationBuilder.AddColumn<string>(
                name: "AssignedVehicleName",
                table: "Drivers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_AssignedDriverId",
                table: "Vehicles",
                column: "AssignedDriverId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Vehicles_Drivers_AssignedDriverId",
                table: "Vehicles",
                column: "AssignedDriverId",
                principalTable: "Drivers",
                principalColumn: "Id");
        }
    }
}
