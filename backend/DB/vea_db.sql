-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 03-06-2025 a las 00:50:11
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `vea_db`
--
CREATE DATABASE IF NOT EXISTS `vea_db` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vea_db`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `article_status`
--

CREATE TABLE `article_status` (
  `id` int(11) NOT NULL,
  `status` char(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `buyers`
--

CREATE TABLE `buyers` (
  `id` int(11) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `category` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--

CREATE TABLE `chat` (
  `id` int(11) NOT NULL,
  `isEnable` tinyint(4) NOT NULL,
  `publishingId` int(11) DEFAULT NULL,
  `buyerId` int(11) DEFAULT NULL,
  `sellerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `department_name` char(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `departments`
--

INSERT INTO `departments` (`id`, `department_name`) VALUES
(1, 'Ahuachapán'),
(2, 'Chalatenango'),
(3, 'Cuscatlán'),
(4, 'La Libertad'),
(5, 'La Paz'),
(6, 'La Unión'),
(7, 'Morazán'),
(8, 'San Miguel'),
(9, 'San Salvador'),
(10, 'San Vicente'),
(11, 'Santa Ana'),
(12, 'Sonsonate'),
(13, 'Usulután');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `municipalities`
--

CREATE TABLE `municipalities` (
  `id` int(11) NOT NULL,
  `municipalityName` char(50) NOT NULL,
  `department_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `municipalities`
--

INSERT INTO `municipalities` (`id`, `municipalityName`, `department_id`) VALUES
(5, 'San Salvador Centro', 9),
(3, 'San Salvador Este', 9),
(2, 'San Salvador Norte', 9),
(1, 'San Salvador Oeste', 9),
(4, 'San Salvador Sur', 9);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `payload`
--

CREATE TABLE `payload` (
  `id` int(11) NOT NULL,
  `name` char(50) NOT NULL,
  `description` char(50) NOT NULL,
  `url` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publishing`
--

CREATE TABLE `publishing` (
  `id` int(11) NOT NULL,
  `title` char(25) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `type` int(11) NOT NULL,
  `statusId` int(11) DEFAULT NULL,
  `sellerId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publishing_categories`
--

CREATE TABLE `publishing_categories` (
  `id` int(11) NOT NULL,
  `publishingId` int(11) DEFAULT NULL,
  `categoryId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publishing_desc`
--

CREATE TABLE `publishing_desc` (
  `id` int(11) NOT NULL,
  `description` text NOT NULL,
  `sku` char(1) NOT NULL,
  `publishingId` int(11) DEFAULT NULL,
  `articleStatusId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publishing_img`
--

CREATE TABLE `publishing_img` (
  `id` int(11) NOT NULL,
  `img` text NOT NULL,
  `url` char(50) NOT NULL,
  `publishingId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `publishing_status`
--

CREATE TABLE `publishing_status` (
  `id` int(11) NOT NULL,
  `status` char(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `refresh_token`
--

CREATE TABLE `refresh_token` (
  `id` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `refresh_token` text NOT NULL,
  `issued_time` timestamp NOT NULL DEFAULT current_timestamp(),
  `expired_time` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `refresh_token`
--

INSERT INTO `refresh_token` (`id`, `userId`, `refresh_token`, `issued_time`, `expired_time`) VALUES
(1, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInRva2VuVmVyc2lvbiI6MCwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NDgzMjY1NDMsImV4cCI6MTc0ODMyNjU1MH0.8hG-lmbbPert2PERlKIdKpNEHqJ5PS0MpfknYjFRGQE', '2025-05-27 06:15:43', '2025-05-27 06:15:50'),
(2, 2, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsInRva2VuVmVyc2lvbiI6MCwidHlwZSI6InJlZnJlc2giLCJpYXQiOjE3NDgzMjY1NTEsImV4cCI6MTc0ODMyNjU1OH0.DHnaLA7c8cYD3Yn_NxHlF4IgGMdBZHhZzqQpBESoqW8', '2025-05-27 06:15:51', '2025-05-27 06:15:58');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` int(11) NOT NULL,
  `review` text NOT NULL,
  `rating` int(11) NOT NULL,
  `saleId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sales`
--

CREATE TABLE `sales` (
  `id` int(11) NOT NULL,
  `publishingId` int(11) DEFAULT NULL,
  `buyerId` int(11) DEFAULT NULL,
  `statusId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_det`
--

CREATE TABLE `sale_det` (
  `id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `saleId` int(11) DEFAULT NULL,
  `payloadId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sale_status`
--

CREATE TABLE `sale_status` (
  `id` int(11) NOT NULL,
  `status` char(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sellers`
--

CREATE TABLE `sellers` (
  `id` int(11) NOT NULL,
  `direction` varchar(255) NOT NULL,
  `phone` varchar(10) NOT NULL,
  `score` decimal(3,2) NOT NULL DEFAULT 0.00,
  `userId` int(11) DEFAULT NULL,
  `municipalityId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `sellers`
--

INSERT INTO `sellers` (`id`, `direction`, `phone`, `score`, `userId`, `municipalityId`) VALUES
(1, 'San Benito', '87654321', 0.00, 2, 5),
(2, 'San Benito', '87654321', 0.00, 2, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `token_version` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `last_login_at` timestamp NULL DEFAULT NULL,
  `failed_login_attempts` int(11) NOT NULL DEFAULT 0,
  `locked_until` timestamp NULL DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` timestamp(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6),
  `name` varchar(50) NOT NULL,
  `username` varchar(30) NOT NULL,
  `img` varchar(255) NOT NULL DEFAULT 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png',
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `token_version`, `is_active`, `last_login_at`, `failed_login_attempts`, `locked_until`, `email_verified_at`, `created_at`, `updated_at`, `name`, `username`, `img`, `email`, `password`) VALUES
(2, 0, 1, NULL, 0, NULL, NULL, '2025-05-27 06:06:39.596084', '2025-05-27 06:14:38.000000', 'Rossman Cabrera', 'rossman', 'https://ejemplo.com/imagen.jpg', 'rossmancd23@gmail.com', '$2b$10$yY9ydsOitbsDU8dY.ACsuOCTqd6rapxQDbtw9dKtHIPNENNoYAv8C'),
(3, 0, 1, '2025-05-28 15:32:23', 0, NULL, NULL, '2025-05-27 06:13:58.289815', '2025-05-28 15:32:23.000000', 'Test User', 'testuser', 'https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png', 'test@gmail.com', '$2b$12$sEyZKc4nIVT37eAQdR5VaO2bEqaEFRIQrO.vwF3z7v./x4zm8iqlq');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_login_attempts`
--

CREATE TABLE `user_login_attempts` (
  `id` int(11) NOT NULL,
  `email` varchar(100) NOT NULL,
  `ip_address` varchar(45) NOT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `is_successful` tinyint(4) NOT NULL DEFAULT 0,
  `failure_reason` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_login_attempts`
--

INSERT INTO `user_login_attempts` (`id`, `email`, `ip_address`, `user_agent`, `is_successful`, `failure_reason`, `created_at`) VALUES
(1, 'rossmancd23@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 0, 'Contraseña incorrecta', '2025-05-27 01:00:26.718737'),
(2, 'rossmancd23@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 0, 'Contraseña incorrecta', '2025-05-27 01:01:12.286177'),
(3, 'rossmancd23@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 0, 'Contraseña incorrecta', '2025-05-27 01:01:52.134331'),
(4, 'rossmancd23@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 0, 'Contraseña incorrecta', '2025-05-27 01:01:53.087347'),
(5, 'rossmancd23@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 0, 'Contraseña incorrecta', '2025-05-27 01:01:54.226869'),
(6, 'test@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 0, 'Contraseña incorrecta', '2025-05-27 01:04:06.990915'),
(7, 'test@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 1, NULL, '2025-05-27 01:05:01.359707'),
(8, 'test@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 1, NULL, '2025-05-27 01:06:10.619740'),
(9, 'test@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 1, NULL, '2025-05-27 01:08:52.987752'),
(10, 'test@gmail.com', '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', 1, NULL, '2025-05-28 09:32:23.165460');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_password_resets`
--

CREATE TABLE `user_password_resets` (
  `id` varchar(36) NOT NULL,
  `email` varchar(100) NOT NULL,
  `token` varchar(255) NOT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `is_used` tinyint(4) NOT NULL DEFAULT 0,
  `ip_address` varchar(45) DEFAULT NULL,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_refresh_tokens`
--

CREATE TABLE `user_refresh_tokens` (
  `id` varchar(36) NOT NULL,
  `userId` int(11) NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `device_info` varchar(100) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_used_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user_refresh_tokens`
--

INSERT INTO `user_refresh_tokens` (`id`, `userId`, `token_hash`, `device_info`, `ip_address`, `user_agent`, `expires_at`, `last_used_at`, `is_active`, `created_at`, `updated_at`) VALUES
('2b3d0b6d-73ff-45bc-a8a0-9a14e84b3d2a', 3, '4d8ae61642c5f264b2ad5a87807c7494f68e7e37fbab4c2dd73ea2626546124f', NULL, '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', '2025-06-03 07:08:53', NULL, 1, '2025-05-27 01:08:53.039450', '2025-05-27 01:08:53.039450'),
('31a38893-1d42-49ce-81db-5b247f7c1a74', 3, 'bd640b6013935fa824ca661e68d56f2e699cea02d3d79d739aa82c89290e82d9', NULL, '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', '2025-06-03 07:06:10', NULL, 1, '2025-05-27 01:06:10.672162', '2025-05-27 01:06:10.672162'),
('9214cb9e-f786-4a79-b9ff-b7ba41570617', 3, '38dee9dcc5a907eb06cb9a3d9827c9fd4afac0abc0f60ccba64c989a6107c67c', NULL, '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', '2025-06-03 07:05:01', NULL, 1, '2025-05-27 01:05:01.416138', '2025-05-27 01:05:01.416138'),
('d886d8fa-b33c-4056-87db-2155b66dd1d7', 3, 'a9883f03600056e83952b0b63c3b9947946bb5ee23bc69438c35c249f6bdd6c3', NULL, '::ffff:127.0.0.1', 'Thunder Client (https://www.thunderclient.com)', '2025-06-04 15:32:23', NULL, 1, '2025-05-28 09:32:23.271173', '2025-05-28 09:32:23.271173');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user_sessions`
--

CREATE TABLE `user_sessions` (
  `id` varchar(36) NOT NULL,
  `userId` int(11) NOT NULL,
  `token_hash` varchar(255) NOT NULL,
  `device_info` varchar(100) DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(500) DEFAULT NULL,
  `expires_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `last_activity_at` timestamp NULL DEFAULT NULL,
  `is_active` tinyint(4) NOT NULL DEFAULT 1,
  `created_at` datetime(6) NOT NULL DEFAULT current_timestamp(6),
  `updated_at` datetime(6) NOT NULL DEFAULT current_timestamp(6) ON UPDATE current_timestamp(6)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `article_status`
--
ALTER TABLE `article_status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `buyers`
--
ALTER TABLE `buyers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_545e00f05d8af4c162fc52c8892` (`userId`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `chat`
--
ALTER TABLE `chat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_ad8aee17dabcd30560780af007c` (`publishingId`),
  ADD KEY `FK_c169da4a873ca09ff3460da64dc` (`buyerId`),
  ADD KEY `FK_ee546e48ed12ba2d307df85cd11` (`sellerId`);

--
-- Indices de la tabla `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_7772b894808a76fe3ac670f380` (`department_name`);

--
-- Indices de la tabla `municipalities`
--
ALTER TABLE `municipalities`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fea2667de3e0b038f1c0988b5d` (`municipalityName`,`department_id`),
  ADD KEY `FK_13c51dfb98bf9cc7a22008c6796` (`department_id`);

--
-- Indices de la tabla `payload`
--
ALTER TABLE `payload`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `publishing`
--
ALTER TABLE `publishing`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_0ab8bd42ea36b110c592e36c815` (`statusId`),
  ADD KEY `FK_658e0f97b292fbec4753b00ec42` (`sellerId`);

--
-- Indices de la tabla `publishing_categories`
--
ALTER TABLE `publishing_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_1ed12985a408ea036e3346bfb99` (`publishingId`),
  ADD KEY `FK_0b2949b04aa9f08a1a211ce91f3` (`categoryId`);

--
-- Indices de la tabla `publishing_desc`
--
ALTER TABLE `publishing_desc`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_9b78e1047c02c63915e5a50d1f4` (`publishingId`),
  ADD KEY `FK_3eb5b0aea31edc43394d64c46c5` (`articleStatusId`);

--
-- Indices de la tabla `publishing_img`
--
ALTER TABLE `publishing_img`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_70934933a471f8e2a9d5be2ea3a` (`publishingId`);

--
-- Indices de la tabla `publishing_status`
--
ALTER TABLE `publishing_status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_8e913e288156c133999341156ad` (`userId`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_f5ff7dbbdb79f6a3c1d2e88d526` (`saleId`);

--
-- Indices de la tabla `sales`
--
ALTER TABLE `sales`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_81700a220c5c8b24abb19c62019` (`publishingId`),
  ADD KEY `FK_ca78120be75f88f303bce98ee18` (`buyerId`),
  ADD KEY `FK_5b88c7c6d23c3e5908cd21f39d6` (`statusId`);

--
-- Indices de la tabla `sale_det`
--
ALTER TABLE `sale_det`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_d07e25e089eb2b2df0996429487` (`saleId`),
  ADD KEY `FK_35404d8e75048d8df674db36861` (`payloadId`);

--
-- Indices de la tabla `sale_status`
--
ALTER TABLE `sale_status`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `sellers`
--
ALTER TABLE `sellers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_4c1c59db4ac1ed90a1a7c0ff3df` (`userId`),
  ADD KEY `FK_5eca4b62c7f27448747e12b4790` (`municipalityId`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_fe0bb3f6520ee0469504521e71` (`username`),
  ADD UNIQUE KEY `IDX_97672ac88f789774dd47f7c8be` (`email`),
  ADD KEY `IDX_20c7aea6112bef71528210f631` (`is_active`);

--
-- Indices de la tabla `user_login_attempts`
--
ALTER TABLE `user_login_attempts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_d4af6a5cae84a8da000dd438a5` (`created_at`),
  ADD KEY `IDX_853290e0897bffb0c0e7d51468` (`ip_address`),
  ADD KEY `IDX_9b441d4752ea667cb1761eaab2` (`email`);

--
-- Indices de la tabla `user_password_resets`
--
ALTER TABLE `user_password_resets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_cb1f054b78230fd07f9453259e` (`token`),
  ADD KEY `IDX_08a551659c5e2fc21c9ce5af8f` (`expires_at`),
  ADD KEY `IDX_da86db3a885a3b1d36b2754410` (`email`);

--
-- Indices de la tabla `user_refresh_tokens`
--
ALTER TABLE `user_refresh_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_b4386e6f9b5b26e329504d6900` (`expires_at`),
  ADD KEY `IDX_814d524857f76960224f639e8a` (`userId`,`token_hash`);

--
-- Indices de la tabla `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `IDX_dbc81ff542b1b3366bae195f2a` (`expires_at`),
  ADD KEY `IDX_6596adb3b8927b35bda97e734a` (`token_hash`),
  ADD KEY `IDX_55fa4db8406ed66bc704432842` (`userId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `article_status`
--
ALTER TABLE `article_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `buyers`
--
ALTER TABLE `buyers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `chat`
--
ALTER TABLE `chat`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `municipalities`
--
ALTER TABLE `municipalities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `payload`
--
ALTER TABLE `payload`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publishing`
--
ALTER TABLE `publishing`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publishing_categories`
--
ALTER TABLE `publishing_categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publishing_desc`
--
ALTER TABLE `publishing_desc`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publishing_img`
--
ALTER TABLE `publishing_img`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `publishing_status`
--
ALTER TABLE `publishing_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `refresh_token`
--
ALTER TABLE `refresh_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sales`
--
ALTER TABLE `sales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sale_det`
--
ALTER TABLE `sale_det`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sale_status`
--
ALTER TABLE `sale_status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sellers`
--
ALTER TABLE `sellers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `user_login_attempts`
--
ALTER TABLE `user_login_attempts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `buyers`
--
ALTER TABLE `buyers`
  ADD CONSTRAINT `FK_545e00f05d8af4c162fc52c8892` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `FK_ad8aee17dabcd30560780af007c` FOREIGN KEY (`publishingId`) REFERENCES `publishing` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_c169da4a873ca09ff3460da64dc` FOREIGN KEY (`buyerId`) REFERENCES `buyers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ee546e48ed12ba2d307df85cd11` FOREIGN KEY (`sellerId`) REFERENCES `sellers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `municipalities`
--
ALTER TABLE `municipalities`
  ADD CONSTRAINT `FK_13c51dfb98bf9cc7a22008c6796` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Filtros para la tabla `publishing`
--
ALTER TABLE `publishing`
  ADD CONSTRAINT `FK_0ab8bd42ea36b110c592e36c815` FOREIGN KEY (`statusId`) REFERENCES `publishing_status` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_658e0f97b292fbec4753b00ec42` FOREIGN KEY (`sellerId`) REFERENCES `sellers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `publishing_categories`
--
ALTER TABLE `publishing_categories`
  ADD CONSTRAINT `FK_0b2949b04aa9f08a1a211ce91f3` FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_1ed12985a408ea036e3346bfb99` FOREIGN KEY (`publishingId`) REFERENCES `publishing` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `publishing_desc`
--
ALTER TABLE `publishing_desc`
  ADD CONSTRAINT `FK_3eb5b0aea31edc43394d64c46c5` FOREIGN KEY (`articleStatusId`) REFERENCES `article_status` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_9b78e1047c02c63915e5a50d1f4` FOREIGN KEY (`publishingId`) REFERENCES `publishing` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `publishing_img`
--
ALTER TABLE `publishing_img`
  ADD CONSTRAINT `FK_70934933a471f8e2a9d5be2ea3a` FOREIGN KEY (`publishingId`) REFERENCES `publishing` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `refresh_token`
--
ALTER TABLE `refresh_token`
  ADD CONSTRAINT `FK_8e913e288156c133999341156ad` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `FK_f5ff7dbbdb79f6a3c1d2e88d526` FOREIGN KEY (`saleId`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sales`
--
ALTER TABLE `sales`
  ADD CONSTRAINT `FK_5b88c7c6d23c3e5908cd21f39d6` FOREIGN KEY (`statusId`) REFERENCES `sale_status` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_81700a220c5c8b24abb19c62019` FOREIGN KEY (`publishingId`) REFERENCES `publishing` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_ca78120be75f88f303bce98ee18` FOREIGN KEY (`buyerId`) REFERENCES `buyers` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sale_det`
--
ALTER TABLE `sale_det`
  ADD CONSTRAINT `FK_35404d8e75048d8df674db36861` FOREIGN KEY (`payloadId`) REFERENCES `payload` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_d07e25e089eb2b2df0996429487` FOREIGN KEY (`saleId`) REFERENCES `sales` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `sellers`
--
ALTER TABLE `sellers`
  ADD CONSTRAINT `FK_4c1c59db4ac1ed90a1a7c0ff3df` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_5eca4b62c7f27448747e12b4790` FOREIGN KEY (`municipalityId`) REFERENCES `municipalities` (`id`) ON DELETE SET NULL ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user_refresh_tokens`
--
ALTER TABLE `user_refresh_tokens`
  ADD CONSTRAINT `FK_7ff254300bfb672252038936bae` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Filtros para la tabla `user_sessions`
--
ALTER TABLE `user_sessions`
  ADD CONSTRAINT `FK_55fa4db8406ed66bc7044328427` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
