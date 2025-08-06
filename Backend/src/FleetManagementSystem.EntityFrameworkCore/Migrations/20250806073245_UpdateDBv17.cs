using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv17 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobCards_Mechanics_MechanicId",
                table: "JobCards");

            migrationBuilder.RenameColumn(
                name: "MechanicId",
                table: "JobCards",
                newName: "AssignedMechanicId");

            migrationBuilder.RenameIndex(
                name: "IX_JobCards_MechanicId",
                table: "JobCards",
                newName: "IX_JobCards_AssignedMechanicId");

            migrationBuilder.AddColumn<Guid>(
                name: "AssignedJobCardId",
                table: "Mechanics",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Mechanics_AssignedJobCardId",
                table: "Mechanics",
                column: "AssignedJobCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobCards_Mechanics_AssignedMechanicId",
                table: "JobCards",
                column: "AssignedMechanicId",
                principalTable: "Mechanics",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Mechanics_JobCards_AssignedJobCardId",
                table: "Mechanics",
                column: "AssignedJobCardId",
                principalTable: "JobCards",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_JobCards_Mechanics_AssignedMechanicId",
                table: "JobCards");

            migrationBuilder.DropForeignKey(
                name: "FK_Mechanics_JobCards_AssignedJobCardId",
                table: "Mechanics");

            migrationBuilder.DropIndex(
                name: "IX_Mechanics_AssignedJobCardId",
                table: "Mechanics");

            migrationBuilder.DropColumn(
                name: "AssignedJobCardId",
                table: "Mechanics");

            migrationBuilder.RenameColumn(
                name: "AssignedMechanicId",
                table: "JobCards",
                newName: "MechanicId");

            migrationBuilder.RenameIndex(
                name: "IX_JobCards_AssignedMechanicId",
                table: "JobCards",
                newName: "IX_JobCards_MechanicId");

            migrationBuilder.AddForeignKey(
                name: "FK_JobCards_Mechanics_MechanicId",
                table: "JobCards",
                column: "MechanicId",
                principalTable: "Mechanics",
                principalColumn: "Id");
        }
    }
}
