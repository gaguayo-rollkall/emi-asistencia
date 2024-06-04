using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class MorefieldsLicencia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Fecha",
                table: "Licencias",
                newName: "FechaInicio");

            migrationBuilder.AddColumn<string>(
                name: "Autorizado",
                table: "Licencias",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "Carrera",
                table: "Licencias",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<DateTime>(
                name: "FechaFin",
                table: "Licencias",
                type: "datetime(6)",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "Semestre",
                table: "Licencias",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Autorizado",
                table: "Licencias");

            migrationBuilder.DropColumn(
                name: "Carrera",
                table: "Licencias");

            migrationBuilder.DropColumn(
                name: "FechaFin",
                table: "Licencias");

            migrationBuilder.DropColumn(
                name: "Semestre",
                table: "Licencias");

            migrationBuilder.RenameColumn(
                name: "FechaInicio",
                table: "Licencias",
                newName: "Fecha");
        }
    }
}
