using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FleetManagementSystem.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDBv20 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Supervisors_JobCards_AssignedJobCardId",
                table: "Supervisors");

            migrationBuilder.DropIndex(
                name: "IX_Supervisors_AssignedJobCardId",
                table: "Supervisors");

            migrationBuilder.DropColumn(
                name: "AssignedJobCardId",
                table: "Supervisors");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "AssignedJobCardId",
                table: "Supervisors",
                type: "uuid",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Supervisors_AssignedJobCardId",
                table: "Supervisors",
                column: "AssignedJobCardId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Supervisors_JobCards_AssignedJobCardId",
                table: "Supervisors",
                column: "AssignedJobCardId",
                principalTable: "JobCards",
                principalColumn: "Id");
        }
    }
}
