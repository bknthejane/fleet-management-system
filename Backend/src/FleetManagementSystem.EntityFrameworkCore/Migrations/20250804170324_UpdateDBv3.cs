using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Drivers_Vehicles_AssignedVehicleId",
                table: "Drivers");

            migrationBuilder.DropIndex(
                name: "IX_Vehicles_AssignedDriverId",
                table: "Vehicles");

            migrationBuilder.DropIndex(
                name: "IX_Drivers_AssignedVehicleId",
                table: "Drivers");

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
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Vehicles_AssignedDriverId",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "AssignedVehicleName",
                table: "Drivers");

            migrationBuilder.CreateIndex(
                name: "IX_Vehicles_AssignedDriverId",
                table: "Vehicles",
                column: "AssignedDriverId");

            migrationBuilder.CreateIndex(
                name: "IX_Drivers_AssignedVehicleId",
                table: "Drivers",
                column: "AssignedVehicleId");

            migrationBuilder.AddForeignKey(
                name: "FK_Drivers_Vehicles_AssignedVehicleId",
                table: "Drivers",
                column: "AssignedVehicleId",
                principalTable: "Vehicles",
                principalColumn: "Id");
        }
    }
}
