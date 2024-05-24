using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class AddPermisosSeguridad : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "PermisoId",
                table: "UsuarioInformaciones",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateTable(
                name: "PermisoSeguridades",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Nombre = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UsuariosSistema = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Reportes = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Carreras = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    PeriodosAcademicos = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Cursos = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Calendario = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Estudiantes = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Licencias = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Control = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Created = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    CreatedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LastModified = table.Column<DateTimeOffset>(type: "datetime(6)", nullable: false),
                    LastModifiedBy = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PermisoSeguridades", x => x.Id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_UsuarioInformaciones_PermisoId",
                table: "UsuarioInformaciones",
                column: "PermisoId");

            migrationBuilder.AddForeignKey(
                name: "FK_UsuarioInformaciones_PermisoSeguridades_PermisoId",
                table: "UsuarioInformaciones",
                column: "PermisoId",
                principalTable: "PermisoSeguridades",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UsuarioInformaciones_PermisoSeguridades_PermisoId",
                table: "UsuarioInformaciones");

            migrationBuilder.DropTable(
                name: "PermisoSeguridades");

            migrationBuilder.DropIndex(
                name: "IX_UsuarioInformaciones_PermisoId",
                table: "UsuarioInformaciones");

            migrationBuilder.DropColumn(
                name: "PermisoId",
                table: "UsuarioInformaciones");
        }
    }
}
