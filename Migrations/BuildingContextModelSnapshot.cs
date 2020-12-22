﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using asp_mvc.Data;

namespace asp_mvc.Migrations
{
    [DbContext(typeof(BuildingContext))]
    partial class BuildingContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .UseIdentityColumns()
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.1");

            modelBuilder.Entity("asp_mvc.Models.Building", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<string>("UserEmail")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserEmail");

                    b.ToTable("Building");
                });

            modelBuilder.Entity("asp_mvc.Models.Line", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .UseIdentityColumn();

                    b.Property<int?>("BuildingId")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("BuildingId");

                    b.ToTable("Line");
                });

            modelBuilder.Entity("asp_mvc.Models.User", b =>
                {
                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Email");

                    b.ToTable("User");
                });

            modelBuilder.Entity("asp_mvc.Models.Building", b =>
                {
                    b.HasOne("asp_mvc.Models.User", null)
                        .WithMany("Buildings")
                        .HasForeignKey("UserEmail");
                });

            modelBuilder.Entity("asp_mvc.Models.Line", b =>
                {
                    b.HasOne("asp_mvc.Models.Building", null)
                        .WithMany("Lines")
                        .HasForeignKey("BuildingId");
                });

            modelBuilder.Entity("asp_mvc.Models.Building", b =>
                {
                    b.Navigation("Lines");
                });

            modelBuilder.Entity("asp_mvc.Models.User", b =>
                {
                    b.Navigation("Buildings");
                });
#pragma warning restore 612, 618
        }
    }
}
