using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace CnoteApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUserProjectandUserTimeCardRelation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                schema: "cnote",
                table: "TimeCards",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                schema: "cnote",
                table: "Projects",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_TimeCards_UserId",
                schema: "cnote",
                table: "TimeCards",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Projects_UserId",
                schema: "cnote",
                table: "Projects",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Projects_Users_UserId",
                schema: "cnote",
                table: "Projects",
                column: "UserId",
                principalSchema: "cnote",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TimeCards_Users_UserId",
                schema: "cnote",
                table: "TimeCards",
                column: "UserId",
                principalSchema: "cnote",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Projects_Users_UserId",
                schema: "cnote",
                table: "Projects");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeCards_Users_UserId",
                schema: "cnote",
                table: "TimeCards");

            migrationBuilder.DropIndex(
                name: "IX_TimeCards_UserId",
                schema: "cnote",
                table: "TimeCards");

            migrationBuilder.DropIndex(
                name: "IX_Projects_UserId",
                schema: "cnote",
                table: "Projects");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "cnote",
                table: "TimeCards");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "cnote",
                table: "Projects");
        }
    }
}
