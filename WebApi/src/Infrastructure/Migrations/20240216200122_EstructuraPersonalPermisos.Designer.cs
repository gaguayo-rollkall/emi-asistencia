﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using WebApi.Infrastructure.Data;

#nullable disable

namespace WebApi.Infrastructure.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20240216200122_EstructuraPersonalPermisos")]
    partial class EstructuraPersonalPermisos
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 64);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("ClaimType")
                        .HasColumnType("longtext");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("longtext");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("varchar(255)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("RoleId")
                        .HasColumnType("varchar(255)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Name")
                        .HasColumnType("varchar(255)");

                    b.Property<string>("Value")
                        .HasColumnType("longtext");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Ambiente", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Ambientes");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Asistencia", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("CodigoEstudiante")
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<int?>("Evento")
                        .HasColumnType("int");

                    b.Property<DateTime>("Fecha")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("RFID")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Asistencias");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Carrera", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Carreras");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.CarreraPeriodo", b =>
                {
                    b.Property<Guid>("CarreraId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("PeriodoAcademicoId")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<Guid>("Id")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.HasKey("CarreraId", "PeriodoAcademicoId");

                    b.HasIndex("PeriodoAcademicoId");

                    b.ToTable("CarreraPeriodos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Curso", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<Guid>("CarreraId")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<Guid>("PeriodoAcademicoId")
                        .HasColumnType("char(36)");

                    b.HasKey("Id");

                    b.HasIndex("CarreraId");

                    b.HasIndex("PeriodoAcademicoId");

                    b.ToTable("Cursos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.CursoEstudiante", b =>
                {
                    b.Property<Guid>("CursoId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("EstudianteId")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<Guid>("Id")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.HasKey("CursoId", "EstudianteId");

                    b.HasIndex("EstudianteId");

                    b.ToTable("CursoEstudiantes");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Estudiante", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Codigo")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<string>("RFID")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Estudiantes");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.EventoCalendario", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    b.Property<string>("Description")
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.Property<DateTime?>("EndTime")
                        .HasColumnType("datetime(6)");

                    b.Property<bool>("IsAllDay")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("Location")
                        .HasMaxLength(120)
                        .HasColumnType("varchar(120)");

                    b.Property<string>("RecurrenceRule")
                        .HasMaxLength(50)
                        .HasColumnType("varchar(50)");

                    b.Property<DateTime?>("StartTime")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Subject")
                        .IsRequired()
                        .HasMaxLength(120)
                        .HasColumnType("varchar(120)");

                    b.HasKey("Id");

                    b.ToTable("EventosCalendario");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.PeriodoAcademico", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<DateTime>("FechaFin")
                        .HasColumnType("datetime(6)");

                    b.Property<DateTime>("FechaInicio")
                        .HasColumnType("datetime(6)");

                    b.Property<int>("Gestion")
                        .HasColumnType("int");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Periodo")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("PeriodoAcademicos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Permiso", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Permisos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Personal", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<string>("Apellido")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("DocumentoIdentidad")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Nombre")
                        .IsRequired()
                        .HasColumnType("longtext");

                    b.HasKey("Id");

                    b.ToTable("Personales");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.PersonalPermiso", b =>
                {
                    b.Property<Guid>("PersonalId")
                        .HasColumnType("char(36)");

                    b.Property<Guid>("PermisoId")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<Guid>("Id")
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.HasKey("PersonalId", "PermisoId");

                    b.ToTable("PersonalPermisos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.TodoItem", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<bool>("Done")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<Guid>("ListId")
                        .HasColumnType("char(36)");

                    b.Property<string>("Note")
                        .HasColumnType("longtext");

                    b.Property<int>("Priority")
                        .HasColumnType("int");

                    b.Property<DateTime?>("Reminder")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.HasIndex("ListId");

                    b.ToTable("TodoItems");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.TodoList", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("char(36)");

                    b.Property<DateTimeOffset>("Created")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("longtext");

                    b.Property<DateTimeOffset>("LastModified")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("LastModifiedBy")
                        .HasColumnType("longtext");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasMaxLength(200)
                        .HasColumnType("varchar(200)");

                    b.HasKey("Id");

                    b.ToTable("TodoLists");
                });

            modelBuilder.Entity("WebApi.Infrastructure.Identity.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("varchar(255)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("longtext");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetime(6)");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("longtext");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("longtext");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("longtext");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("tinyint(1)");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("varchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("WebApi.Infrastructure.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("WebApi.Infrastructure.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Infrastructure.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("WebApi.Infrastructure.Identity.ApplicationUser", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("WebApi.Domain.Entities.CarreraPeriodo", b =>
                {
                    b.HasOne("WebApi.Domain.Entities.Carrera", "Carrera")
                        .WithMany("CarreraPeriodos")
                        .HasForeignKey("CarreraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Domain.Entities.PeriodoAcademico", "PeriodoAcademico")
                        .WithMany("CarreraPeriodos")
                        .HasForeignKey("PeriodoAcademicoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Carrera");

                    b.Navigation("PeriodoAcademico");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Curso", b =>
                {
                    b.HasOne("WebApi.Domain.Entities.Carrera", "Carrera")
                        .WithMany("Cursos")
                        .HasForeignKey("CarreraId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Domain.Entities.PeriodoAcademico", "PeriodoAcademico")
                        .WithMany("Cursos")
                        .HasForeignKey("PeriodoAcademicoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Carrera");

                    b.Navigation("PeriodoAcademico");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.CursoEstudiante", b =>
                {
                    b.HasOne("WebApi.Domain.Entities.Curso", "Curso")
                        .WithMany("CursoEstudiantes")
                        .HasForeignKey("CursoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Domain.Entities.Estudiante", "Estudiante")
                        .WithMany("Cursos")
                        .HasForeignKey("EstudianteId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Curso");

                    b.Navigation("Estudiante");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.PersonalPermiso", b =>
                {
                    b.HasOne("WebApi.Domain.Entities.Permiso", "Permiso")
                        .WithMany("PersonalPermisos")
                        .HasForeignKey("PersonalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("WebApi.Domain.Entities.Personal", "Personal")
                        .WithMany("PersonalPermisos")
                        .HasForeignKey("PersonalId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Permiso");

                    b.Navigation("Personal");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.TodoItem", b =>
                {
                    b.HasOne("WebApi.Domain.Entities.TodoList", "List")
                        .WithMany("Items")
                        .HasForeignKey("ListId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("List");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.TodoList", b =>
                {
                    b.OwnsOne("WebApi.Domain.ValueObjects.Colour", "Colour", b1 =>
                        {
                            b1.Property<Guid>("TodoListId")
                                .HasColumnType("char(36)");

                            b1.Property<string>("Code")
                                .IsRequired()
                                .HasColumnType("longtext");

                            b1.HasKey("TodoListId");

                            b1.ToTable("TodoLists");

                            b1.WithOwner()
                                .HasForeignKey("TodoListId");
                        });

                    b.Navigation("Colour")
                        .IsRequired();
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Carrera", b =>
                {
                    b.Navigation("CarreraPeriodos");

                    b.Navigation("Cursos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Curso", b =>
                {
                    b.Navigation("CursoEstudiantes");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Estudiante", b =>
                {
                    b.Navigation("Cursos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.PeriodoAcademico", b =>
                {
                    b.Navigation("CarreraPeriodos");

                    b.Navigation("Cursos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Permiso", b =>
                {
                    b.Navigation("PersonalPermisos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.Personal", b =>
                {
                    b.Navigation("PersonalPermisos");
                });

            modelBuilder.Entity("WebApi.Domain.Entities.TodoList", b =>
                {
                    b.Navigation("Items");
                });
#pragma warning restore 612, 618
        }
    }
}
