using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "MunicipalityName",
                table: "Vehicles",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MunicipalityName",
                table: "Supervisors",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MunicipalityName",
                table: "Mechanics",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MunicipalityName",
                table: "Incidents",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MunicipalityName",
                table: "Drivers",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "MunicipalityName",
                table: "Vehicles");

            migrationBuilder.DropColumn(
                name: "MunicipalityName",
                table: "Supervisors");

            migrationBuilder.DropColumn(
                name: "MunicipalityName",
                table: "Mechanics");

            migrationBuilder.DropColumn(
                name: "MunicipalityName",
                table: "Incidents");

            migrationBuilder.DropColumn(
                name: "MunicipalityName",
                table: "Drivers");
        }
    }
}
