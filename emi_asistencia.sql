-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: servidor-mysql
-- Generation Time: Feb 15, 2024 at 06:52 PM
-- Server version: 8.3.0
-- PHP Version: 8.2.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `emi_asistencia`
--

-- --------------------------------------------------------

--
-- Table structure for table `Asistencias`
--

CREATE TABLE `Asistencias` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Fecha` datetime(6) NOT NULL,
  `RFID` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `CodigoEstudiante` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Evento` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Asistencias`
--

INSERT INTO `Asistencias` (`Id`, `Fecha`, `RFID`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `CodigoEstudiante`, `Evento`) VALUES
('08dc2dce-cf54-425a-8e81-58af24f12cc7', '2024-02-14 22:35:44.430670', '0002836108', '2024-02-15 02:35:44.585648', NULL, '2024-02-15 02:35:44.586062', NULL, NULL, NULL),
('08dc2dcf-7ea0-41cf-8f5d-755aa6919bf2', '2024-02-14 22:40:38.515325', '0002836108', '2024-02-15 02:40:38.715121', NULL, '2024-02-15 02:40:38.715610', NULL, NULL, NULL),
('08dc2dcf-86a2-4247-8313-2abc7d007023', '2024-02-14 22:40:52.000573', '0002836108', '2024-02-15 02:40:52.002676', NULL, '2024-02-15 02:40:52.002677', NULL, NULL, NULL),
('08dc2e0d-fd3a-4b87-85e6-fdcf9d557864', '2024-02-15 06:07:59.729288', '', '2024-02-15 10:07:59.882633', NULL, '2024-02-15 10:07:59.882986', NULL, 'T-79878', 2),
('08dc2e55-e907-4cc0-8c76-37d620a6d061', '2024-02-15 14:42:49.636804', '0003054664', '2024-02-15 18:42:49.682779', NULL, '2024-02-15 18:42:49.682801', NULL, NULL, NULL),
('08dc2e55-eb41-4581-8428-549ce6f6197d', '2024-02-15 14:42:53.377721', '0002791314', '2024-02-15 18:42:53.379604', NULL, '2024-02-15 18:42:53.379605', NULL, NULL, NULL),
('08dc2e55-f51b-4f3b-80cf-0b89a837ddac', '2024-02-15 14:43:09.911489', '0002836108', '2024-02-15 18:43:09.911678', NULL, '2024-02-15 18:43:09.911678', NULL, NULL, NULL),
('08dc2e56-6805-4429-8f24-68472ffdfa88', '2024-02-15 14:46:22.700768', '', '2024-02-15 18:46:22.702740', NULL, '2024-02-15 18:46:22.702741', NULL, 'T-79878', 3),
('08dc2e56-a7dd-4643-8c19-99989d040109', '2024-02-15 14:48:09.813653', '0002791314', '2024-02-15 18:48:09.813928', NULL, '2024-02-15 18:48:09.813928', NULL, NULL, NULL),
('08dc2e56-aac7-4701-84ec-9ae85f5ac99d', '2024-02-15 14:48:14.702958', '0002791314', '2024-02-15 18:48:14.703115', NULL, '2024-02-15 18:48:14.703118', NULL, NULL, NULL),
('08dc2e56-bf87-4fe5-803e-a7b6cd32fb24', '2024-02-15 14:48:49.519316', '0002791314', '2024-02-15 18:48:49.519495', NULL, '2024-02-15 18:48:49.519496', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `AspNetRoleClaims`
--

CREATE TABLE `AspNetRoleClaims` (
  `Id` int NOT NULL,
  `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `AspNetRoles`
--

CREATE TABLE `AspNetRoles` (
  `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `AspNetUserClaims`
--

CREATE TABLE `AspNetUserClaims` (
  `Id` int NOT NULL,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ClaimType` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ClaimValue` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `AspNetUserLogins`
--

CREATE TABLE `AspNetUserLogins` (
  `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderKey` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProviderDisplayName` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `AspNetUserRoles`
--

CREATE TABLE `AspNetUserRoles` (
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RoleId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `AspNetUsers`
--

CREATE TABLE `AspNetUsers` (
  `Id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `UserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Email` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `NormalizedEmail` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `EmailConfirmed` tinyint(1) NOT NULL,
  `PasswordHash` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `SecurityStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `ConcurrencyStamp` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumber` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `PhoneNumberConfirmed` tinyint(1) NOT NULL,
  `TwoFactorEnabled` tinyint(1) NOT NULL,
  `LockoutEnd` datetime(6) DEFAULT NULL,
  `LockoutEnabled` tinyint(1) NOT NULL,
  `AccessFailedCount` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `AspNetUsers`
--

INSERT INTO `AspNetUsers` (`Id`, `UserName`, `NormalizedUserName`, `Email`, `NormalizedEmail`, `EmailConfirmed`, `PasswordHash`, `SecurityStamp`, `ConcurrencyStamp`, `PhoneNumber`, `PhoneNumberConfirmed`, `TwoFactorEnabled`, `LockoutEnd`, `LockoutEnabled`, `AccessFailedCount`) VALUES
('eb890140-e1bb-401c-8375-53833df0ae89', 'administrator@emi.com', 'ADMINISTRATOR@EMI.COM', 'administrator@emi.com', 'ADMINISTRATOR@EMI.COM', 0, 'AQAAAAIAAYagAAAAECo8CXi+K0CXIVT5idfL1rQ/5CqKls0Hs5UeQlTRW6fwDJ3MBASWkwDHVv03AQni1w==', 'YGWEDLPT3VCSKLWDWJMR74WU2VHSRVFS', '89429237-8ec6-48ee-bf02-022a01bc9312', NULL, 0, 0, NULL, 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `AspNetUserTokens`
--

CREATE TABLE `AspNetUserTokens` (
  `UserId` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LoginProvider` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Value` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `CarreraPeriodos`
--

CREATE TABLE `CarreraPeriodos` (
  `CarreraId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `PeriodoAcademicoId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `Carreras`
--

CREATE TABLE `Carreras` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Nombre` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Carreras`
--

INSERT INTO `Carreras` (`Id`, `Nombre`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`) VALUES
('08dc295b-3560-4b32-8790-ca0e2b39555d', 'Ingenieria de Sistemas', '2024-02-09 10:38:09.482258', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-12 19:24:54.034787', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2c00-4d45-49ac-8853-8c0036e35d1e', 'Ingenieria Eletronica', '2024-02-12 19:24:58.788707', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-12 19:24:58.788891', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2c00-51fe-4d35-85d2-b7f7f894b35b', 'Ingenieria Mecatronica', '2024-02-12 19:25:06.704729', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-12 19:25:06.704731', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2c00-55b6-4c5a-8245-e6bd7be23f65', 'Ingenieria Civil', '2024-02-12 19:25:12.943288', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-13 19:12:30.955798', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2c00-5a4b-4cd4-8a46-d0dc6c80e698', 'Ingenieria Petrolera', '2024-02-12 19:25:20.630846', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-12 19:25:20.630846', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2c31-d63d-4251-8b79-4007a6da0a22', 'Ingenieria Comercial', '2024-02-13 01:19:33.932261', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-13 01:21:27.639858', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2e53-c4cc-4618-8b5d-33d97d7e09e4', 'Ingenieria de Alimentos', '2024-02-15 18:27:29.946351', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-15 18:27:29.946521', 'eb890140-e1bb-401c-8375-53833df0ae89');

-- --------------------------------------------------------

--
-- Table structure for table `CursoEstudiantes`
--

CREATE TABLE `CursoEstudiantes` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `CursoId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `EstudianteId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `CursoEstudiantes`
--

INSERT INTO `CursoEstudiantes` (`Id`, `CursoId`, `EstudianteId`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`) VALUES
('00000000-0000-0000-0000-000000000000', '08dc2cf9-75c1-4c1c-89d5-13d2730c503b', '657b9d1f-21bb-4764-908a-e8f54152f5d8', '2024-02-14 02:27:21.692888', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692888', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('00000000-0000-0000-0000-000000000000', '08dc2cf9-75c1-4c1c-89d5-13d2730c503b', '6851319a-fda7-4eda-9f0f-dfa06ce20989', '2024-02-14 02:27:21.692886', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692887', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('00000000-0000-0000-0000-000000000000', '08dc2cf9-75c1-4c1c-89d5-13d2730c503b', '8cf4d306-5dd9-4552-a484-d017055a2d5a', '2024-02-14 02:27:21.692885', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692885', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('00000000-0000-0000-0000-000000000000', '08dc2cf9-75c1-4c1c-89d5-13d2730c503b', 'ac4a9baa-a5e7-41db-b48e-0c1850d4153e', '2024-02-14 02:27:21.692891', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692893', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('00000000-0000-0000-0000-000000000000', '08dc2cf9-75c1-4c1c-89d5-13d2730c503b', 'c74e4934-12f5-4b1b-be1c-0e112ef096a9', '2024-02-14 02:27:21.692889', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692889', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('00000000-0000-0000-0000-000000000000', '08dc2e53-f4b8-42c0-8485-0bd71528cf9c', '1af0fe44-5983-4185-9044-13a00cd8d3b5', '2024-02-15 18:40:32.912592', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-15 18:40:32.912592', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('00000000-0000-0000-0000-000000000000', '08dc2e53-f4b8-42c0-8485-0bd71528cf9c', '6367c29e-1106-4387-a07b-69dee19afc4f', '2024-02-15 18:40:32.912594', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-15 18:40:32.912594', 'eb890140-e1bb-401c-8375-53833df0ae89');

-- --------------------------------------------------------

--
-- Table structure for table `Cursos`
--

CREATE TABLE `Cursos` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `CarreraId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `PeriodoAcademicoId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Nombre` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Cursos`
--

INSERT INTO `Cursos` (`Id`, `CarreraId`, `PeriodoAcademicoId`, `Nombre`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`) VALUES
('08dc2cf9-47d0-40ea-88a4-28288666ddac', '08dc2c00-55b6-4c5a-8245-e6bd7be23f65', '08dc2c13-81f3-4175-84d7-ede8067e902f', 'Primer Semestre', '2024-02-14 01:07:14.306877', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 01:07:14.306877', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2cf9-6b30-478b-891a-f8c9dd3571be', '08dc2c00-55b6-4c5a-8245-e6bd7be23f65', '08dc2c13-81f3-4175-84d7-ede8067e902f', 'Segundo Semestre', '2024-02-14 01:08:13.658964', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 01:08:13.658967', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2cf9-75c1-4c1c-89d5-13d2730c503b', '08dc295b-3560-4b32-8790-ca0e2b39555d', '08dc2c13-81f3-4175-84d7-ede8067e902f', 'Decimo Semestre', '2024-02-14 01:08:31.388162', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 01:08:31.388163', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2e53-e906-4061-838a-57f0d1b3ffa3', '08dc295b-3560-4b32-8790-ca0e2b39555d', '08dc2c13-81f3-4175-84d7-ede8067e902f', 'Novemo Semestre', '2024-02-15 18:28:30.665814', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-15 18:28:30.665815', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2e53-f4b8-42c0-8485-0bd71528cf9c', '08dc295b-3560-4b32-8790-ca0e2b39555d', '08dc2c13-81f3-4175-84d7-ede8067e902f', 'Tercer Semestre', '2024-02-15 18:28:50.264458', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-15 18:28:50.264459', 'eb890140-e1bb-401c-8375-53833df0ae89');

-- --------------------------------------------------------

--
-- Table structure for table `Estudiantes`
--

CREATE TABLE `Estudiantes` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Codigo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RFID` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Nombre` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `Estudiantes`
--

INSERT INTO `Estudiantes` (`Id`, `Codigo`, `RFID`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`, `Email`, `Nombre`) VALUES
('1af0fe44-5983-4185-9044-13a00cd8d3b5', 'A-45464', '0002791314', '2024-02-15 18:40:32.912090', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-15 18:48:44.920548', 'eb890140-e1bb-401c-8375-53833df0ae89', '', 'Bryan Rueda'),
('6367c29e-1106-4387-a07b-69dee19afc4f', 'A-12132', '0003054664', '2024-02-15 18:40:32.912593', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-15 18:41:54.965298', 'eb890140-e1bb-401c-8375-53833df0ae89', '', 'Laura Zanabria'),
('657b9d1f-21bb-4764-908a-e8f54152f5d8', 'T-79878', '0002836108', '2024-02-14 02:27:21.692887', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-15 02:29:36.100884', 'eb890140-e1bb-401c-8375-53833df0ae89', '', 'Eduardo'),
('6851319a-fda7-4eda-9f0f-dfa06ce20989', 'T-12564', '', '2024-02-14 02:27:21.692886', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692886', 'eb890140-e1bb-401c-8375-53833df0ae89', '', ''),
('8cf4d306-5dd9-4552-a484-d017055a2d5a', 'T-12345', '', '2024-02-14 02:27:21.692420', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692733', 'eb890140-e1bb-401c-8375-53833df0ae89', '', ''),
('ac4a9baa-a5e7-41db-b48e-0c1850d4153e', 'T-63214', '', '2024-02-14 02:27:21.692890', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692890', 'eb890140-e1bb-401c-8375-53833df0ae89', '', ''),
('c74e4934-12f5-4b1b-be1c-0e112ef096a9', 'T-12134', '', '2024-02-14 02:27:21.692889', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-14 02:27:21.692889', 'eb890140-e1bb-401c-8375-53833df0ae89', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `EventosCalendario`
--

CREATE TABLE `EventosCalendario` (
  `Id` int NOT NULL,
  `Description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `StartTime` datetime(6) DEFAULT NULL,
  `EndTime` datetime(6) DEFAULT NULL,
  `IsAllDay` tinyint(1) NOT NULL,
  `Subject` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Location` varchar(120) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `RecurrenceRule` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `EventosCalendario`
--

INSERT INTO `EventosCalendario` (`Id`, `Description`, `StartTime`, `EndTime`, `IsAllDay`, `Subject`, `Location`, `RecurrenceRule`) VALUES
(1, NULL, '2024-02-14 07:00:00.000000', '2024-02-14 07:30:00.000000', 0, 'Asistencia', NULL, NULL),
(2, NULL, '2024-02-15 14:00:00.000000', '2024-02-15 14:30:00.000000', 0, 'Revisar Sistema', NULL, NULL),
(3, NULL, '2024-02-16 07:30:00.000000', '2024-02-16 08:00:00.000000', 0, 'Desfile', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `PeriodoAcademicos`
--

CREATE TABLE `PeriodoAcademicos` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Periodo` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Gestion` int NOT NULL,
  `FechaInicio` datetime(6) NOT NULL,
  `FechaFin` datetime(6) NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `PeriodoAcademicos`
--

INSERT INTO `PeriodoAcademicos` (`Id`, `Periodo`, `Gestion`, `FechaInicio`, `FechaFin`, `Created`, `CreatedBy`, `LastModified`, `LastModifiedBy`) VALUES
('08dc2c13-81f3-4175-84d7-ede8067e902f', 'I', 2024, '2024-02-05 00:00:00.000000', '2024-06-30 00:00:00.000000', '2024-02-12 21:42:27.697563', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-12 21:42:27.698048', 'eb890140-e1bb-401c-8375-53833df0ae89'),
('08dc2c14-e5e8-40ab-8900-645a8c580437', 'II', 2024, '2024-06-30 00:00:00.000000', '2024-12-12 00:00:00.000000', '2024-02-12 21:52:24.792957', 'eb890140-e1bb-401c-8375-53833df0ae89', '2024-02-12 21:52:24.792958', 'eb890140-e1bb-401c-8375-53833df0ae89');

-- --------------------------------------------------------

--
-- Table structure for table `TodoItems`
--

CREATE TABLE `TodoItems` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `ListId` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Note` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `Priority` int NOT NULL,
  `Reminder` datetime(6) DEFAULT NULL,
  `Done` tinyint(1) NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `TodoLists`
--

CREATE TABLE `TodoLists` (
  `Id` char(36) CHARACTER SET ascii COLLATE ascii_general_ci NOT NULL,
  `Title` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Colour_Code` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Created` datetime(6) NOT NULL,
  `CreatedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci,
  `LastModified` datetime(6) NOT NULL,
  `LastModifiedBy` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `__EFMigrationsHistory`
--

CREATE TABLE `__EFMigrationsHistory` (
  `MigrationId` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ProductVersion` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `__EFMigrationsHistory`
--

INSERT INTO `__EFMigrationsHistory` (`MigrationId`, `ProductVersion`) VALUES
('20240209021300_Initial', '8.0.0'),
('20240213201609_Estructura', '8.0.0'),
('20240214020209_CursoEstudiantes', '8.0.0'),
('20240214033537_Eventos', '8.0.0'),
('20240214102730_AjusteEventos', '8.0.0'),
('20240215023434_DetallesAsistencia', '8.0.0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Asistencias`
--
ALTER TABLE `Asistencias`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `AspNetRoleClaims`
--
ALTER TABLE `AspNetRoleClaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetRoleClaims_RoleId` (`RoleId`);

--
-- Indexes for table `AspNetRoles`
--
ALTER TABLE `AspNetRoles`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `RoleNameIndex` (`NormalizedName`);

--
-- Indexes for table `AspNetUserClaims`
--
ALTER TABLE `AspNetUserClaims`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_AspNetUserClaims_UserId` (`UserId`);

--
-- Indexes for table `AspNetUserLogins`
--
ALTER TABLE `AspNetUserLogins`
  ADD PRIMARY KEY (`LoginProvider`,`ProviderKey`),
  ADD KEY `IX_AspNetUserLogins_UserId` (`UserId`);

--
-- Indexes for table `AspNetUserRoles`
--
ALTER TABLE `AspNetUserRoles`
  ADD PRIMARY KEY (`UserId`,`RoleId`),
  ADD KEY `IX_AspNetUserRoles_RoleId` (`RoleId`);

--
-- Indexes for table `AspNetUsers`
--
ALTER TABLE `AspNetUsers`
  ADD PRIMARY KEY (`Id`),
  ADD UNIQUE KEY `UserNameIndex` (`NormalizedUserName`),
  ADD KEY `EmailIndex` (`NormalizedEmail`);

--
-- Indexes for table `AspNetUserTokens`
--
ALTER TABLE `AspNetUserTokens`
  ADD PRIMARY KEY (`UserId`,`LoginProvider`,`Name`);

--
-- Indexes for table `CarreraPeriodos`
--
ALTER TABLE `CarreraPeriodos`
  ADD PRIMARY KEY (`CarreraId`,`PeriodoAcademicoId`),
  ADD KEY `IX_CarreraPeriodos_PeriodoAcademicoId` (`PeriodoAcademicoId`);

--
-- Indexes for table `Carreras`
--
ALTER TABLE `Carreras`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `CursoEstudiantes`
--
ALTER TABLE `CursoEstudiantes`
  ADD PRIMARY KEY (`CursoId`,`EstudianteId`),
  ADD KEY `IX_CursoEstudiantes_EstudianteId` (`EstudianteId`);

--
-- Indexes for table `Cursos`
--
ALTER TABLE `Cursos`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_Cursos_CarreraId` (`CarreraId`),
  ADD KEY `IX_Cursos_PeriodoAcademicoId` (`PeriodoAcademicoId`);

--
-- Indexes for table `Estudiantes`
--
ALTER TABLE `Estudiantes`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `EventosCalendario`
--
ALTER TABLE `EventosCalendario`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `PeriodoAcademicos`
--
ALTER TABLE `PeriodoAcademicos`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `TodoItems`
--
ALTER TABLE `TodoItems`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `IX_TodoItems_ListId` (`ListId`);

--
-- Indexes for table `TodoLists`
--
ALTER TABLE `TodoLists`
  ADD PRIMARY KEY (`Id`);

--
-- Indexes for table `__EFMigrationsHistory`
--
ALTER TABLE `__EFMigrationsHistory`
  ADD PRIMARY KEY (`MigrationId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AspNetRoleClaims`
--
ALTER TABLE `AspNetRoleClaims`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `AspNetUserClaims`
--
ALTER TABLE `AspNetUserClaims`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `EventosCalendario`
--
ALTER TABLE `EventosCalendario`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AspNetRoleClaims`
--
ALTER TABLE `AspNetRoleClaims`
  ADD CONSTRAINT `FK_AspNetRoleClaims_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `AspNetUserClaims`
--
ALTER TABLE `AspNetUserClaims`
  ADD CONSTRAINT `FK_AspNetUserClaims_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `AspNetUserLogins`
--
ALTER TABLE `AspNetUserLogins`
  ADD CONSTRAINT `FK_AspNetUserLogins_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `AspNetUserRoles`
--
ALTER TABLE `AspNetUserRoles`
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetRoles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `AspNetRoles` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_AspNetUserRoles_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `AspNetUserTokens`
--
ALTER TABLE `AspNetUserTokens`
  ADD CONSTRAINT `FK_AspNetUserTokens_AspNetUsers_UserId` FOREIGN KEY (`UserId`) REFERENCES `AspNetUsers` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `CarreraPeriodos`
--
ALTER TABLE `CarreraPeriodos`
  ADD CONSTRAINT `FK_CarreraPeriodos_Carreras_CarreraId` FOREIGN KEY (`CarreraId`) REFERENCES `Carreras` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_CarreraPeriodos_PeriodoAcademicos_PeriodoAcademicoId` FOREIGN KEY (`PeriodoAcademicoId`) REFERENCES `PeriodoAcademicos` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `CursoEstudiantes`
--
ALTER TABLE `CursoEstudiantes`
  ADD CONSTRAINT `FK_CursoEstudiantes_Cursos_CursoId` FOREIGN KEY (`CursoId`) REFERENCES `Cursos` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_CursoEstudiantes_Estudiantes_EstudianteId` FOREIGN KEY (`EstudianteId`) REFERENCES `Estudiantes` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `Cursos`
--
ALTER TABLE `Cursos`
  ADD CONSTRAINT `FK_Cursos_Carreras_CarreraId` FOREIGN KEY (`CarreraId`) REFERENCES `Carreras` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `FK_Cursos_PeriodoAcademicos_PeriodoAcademicoId` FOREIGN KEY (`PeriodoAcademicoId`) REFERENCES `PeriodoAcademicos` (`Id`) ON DELETE CASCADE;

--
-- Constraints for table `TodoItems`
--
ALTER TABLE `TodoItems`
  ADD CONSTRAINT `FK_TodoItems_TodoLists_ListId` FOREIGN KEY (`ListId`) REFERENCES `TodoLists` (`Id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
