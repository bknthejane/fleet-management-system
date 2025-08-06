using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv14 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Supervisors_UserId",
                table: "Supervisors");

            migrationBuilder.AddColumn<Guid>(
                name: "SupervisorId",
                table: "AbpUsers",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SupervisorName",
                table: "AbpUsers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Supervisors_UserId",
                table: "Supervisors",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Supervisors_UserId",
                table: "Supervisors");

            migrationBuilder.DropColumn(
                name: "SupervisorId",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "SupervisorName",
                table: "AbpUsers");

            migrationBuilder.CreateIndex(
                name: "IX_Supervisors_UserId",
                table: "Supervisors",
                column: "UserId");
        }
    }
}
