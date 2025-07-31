using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class CreateJobCard : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActualCost",
                table: "JobCards");

            migrationBuilder.DropColumn(
                name: "EstimatedCost",
                table: "JobCards");

            migrationBuilder.AddColumn<Guid>(
                name: "MechanicId",
                table: "JobCards",
                type: "uuid",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Department",
                table: "Incidents",
                type: "text",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_JobCards_MechanicId",
                table: "JobCards",
                column: "MechanicId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobCards_Mechanics_MechanicId",
                table: "JobCards",
                column: "MechanicId",
                principalTable: "Mechanics",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobCards_Mechanics_MechanicId",
                table: "JobCards");

            migrationBuilder.DropIndex(
                name: "IX_JobCards_MechanicId",
                table: "JobCards");

            migrationBuilder.DropColumn(
                name: "MechanicId",
                table: "JobCards");

            migrationBuilder.DropColumn(
                name: "Department",
                table: "Incidents");

            migrationBuilder.AddColumn<decimal>(
                name: "ActualCost",
                table: "JobCards",
                type: "numeric",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "EstimatedCost",
                table: "JobCards",
                type: "numeric",
                nullable: true);
        }
    }
}
