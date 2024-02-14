using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class CursoEstudiantes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CursoEstudiante_Cursos_CursoId",
                table: "CursoEstudiante");

            migrationBuilder.DropForeignKey(
                name: "FK_CursoEstudiante_Estudiantes_EstudianteId",
                table: "CursoEstudiante");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CursoEstudiante",
                table: "CursoEstudiante");

            migrationBuilder.DropIndex(
                name: "IX_CursoEstudiante_CursoId",
                table: "CursoEstudiante");

            migrationBuilder.RenameTable(
                name: "CursoEstudiante",
                newName: "CursoEstudiantes");

            migrationBuilder.RenameIndex(
                name: "IX_CursoEstudiante_EstudianteId",
                table: "CursoEstudiantes",
                newName: "IX_CursoEstudiantes_EstudianteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CursoEstudiantes",
                table: "CursoEstudiantes",
                columns: new[] { "CursoId", "EstudianteId" });

            migrationBuilder.AddForeignKey(
                name: "FK_CursoEstudiantes_Cursos_CursoId",
                table: "CursoEstudiantes",
                column: "CursoId",
                principalTable: "Cursos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CursoEstudiantes_Estudiantes_EstudianteId",
                table: "CursoEstudiantes",
                column: "EstudianteId",
                principalTable: "Estudiantes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CursoEstudiantes_Cursos_CursoId",
                table: "CursoEstudiantes");

            migrationBuilder.DropForeignKey(
                name: "FK_CursoEstudiantes_Estudiantes_EstudianteId",
                table: "CursoEstudiantes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CursoEstudiantes",
                table: "CursoEstudiantes");

            migrationBuilder.RenameTable(
                name: "CursoEstudiantes",
                newName: "CursoEstudiante");

            migrationBuilder.RenameIndex(
                name: "IX_CursoEstudiantes_EstudianteId",
                table: "CursoEstudiante",
                newName: "IX_CursoEstudiante_EstudianteId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CursoEstudiante",
                table: "CursoEstudiante",
                column: "Id");

            migrationBuilder.CreateIndex(
                name: "IX_CursoEstudiante_CursoId",
                table: "CursoEstudiante",
                column: "CursoId");

            migrationBuilder.AddForeignKey(
                name: "FK_CursoEstudiante_Cursos_CursoId",
                table: "CursoEstudiante",
                column: "CursoId",
                principalTable: "Cursos",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_CursoEstudiante_Estudiantes_EstudianteId",
                table: "CursoEstudiante",
                column: "EstudianteId",
                principalTable: "Estudiantes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
