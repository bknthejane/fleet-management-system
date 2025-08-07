using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv21 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AssignedJobCardNumber",
                table: "Mechanics",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AssignedMechanicName",
                table: "JobCards",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AssignedJobCardNumber",
                table: "Mechanics");

            migrationBuilder.DropColumn(
                name: "AssignedMechanicName",
                table: "JobCards");
        }
    }
}
