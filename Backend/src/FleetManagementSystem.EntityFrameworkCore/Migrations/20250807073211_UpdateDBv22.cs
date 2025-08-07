using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv22 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Mechanics_UserId",
                table: "Mechanics");

            migrationBuilder.AddColumn<Guid>(
                name: "MechanicId",
                table: "AbpUsers",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MechanicName",
                table: "AbpUsers",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mechanics_UserId",
                table: "Mechanics",
                column: "UserId",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Mechanics_UserId",
                table: "Mechanics");

            migrationBuilder.DropColumn(
                name: "MechanicId",
                table: "AbpUsers");

            migrationBuilder.DropColumn(
                name: "MechanicName",
                table: "AbpUsers");

            migrationBuilder.CreateIndex(
                name: "IX_Mechanics_UserId",
                table: "Mechanics",
                column: "UserId");
        }
    }
}
