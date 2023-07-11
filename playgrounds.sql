-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 11, 2023 at 10:16 AM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playgrounds`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`id`, `created_at`, `updated_at`, `name`) VALUES
(1, NULL, NULL, 'tennis'),
(2, NULL, NULL, 'paddle'),
(3, NULL, NULL, 'football');

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `receiver_id` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `message` varchar(255) NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `complaints`
--

CREATE TABLE `complaints` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `playground_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `playground_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `image_play_grounds`
--

CREATE TABLE `image_play_grounds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `playgrounds_id` bigint(20) UNSIGNED NOT NULL,
  `subImage` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `image_play_grounds`
--

INSERT INTO `image_play_grounds` (`id`, `playgrounds_id`, `subImage`, `created_at`, `updated_at`) VALUES
(1, 37, '16886707061.png', '2023-07-06 16:11:46', '2023-07-06 16:11:46'),
(2, 38, '16887349881.jpg', '2023-07-07 10:03:08', '2023-07-07 10:03:08'),
(3, 38, '16887349882.jpg', '2023-07-07 10:03:08', '2023-07-07 10:03:08');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_06_21_234718_create_playgrounds_table', 1),
(6, '2023_06_25_125234_create_reviews_table', 2),
(7, '2023_06_28_155430_create_categories_table', 2),
(8, '2023_07_01_175307_add_rating_playground', 3),
(9, '2023_07_02_151900_create_image_play_grounds_table', 3),
(10, '2023_07_04_062306_create_chat_messages_table', 3),
(11, '2023_07_04_063029_add_default_value_to_message_field_in_chat_messages_table', 3),
(12, '2023_07_04_152222_create_complaints_table', 3),
(13, '2023_07_04_170053_create_time_slots_table', 4),
(14, '2023_07_04_191529_add_colums_playground', 4),
(15, '2023_07_05_132910_add_slot_id_to_time_slots', 5),
(16, '2023_07_05_150838_create_reservations_table', 5),
(17, '0000_00_00_000000_create_websockets_statistics_entries_table', 6),
(18, '2019_05_11_000000_create_otps_table', 6),
(19, '2023_07_07_145356_create_favorites_table', 6);

-- --------------------------------------------------------

--
-- Table structure for table `otps`
--

CREATE TABLE `otps` (
  `id` int(10) UNSIGNED NOT NULL,
  `identifier` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `validity` int(11) NOT NULL,
  `valid` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `otps`
--

INSERT INTO `otps` (`id`, `identifier`, `token`, `validity`, `valid`, `created_at`, `updated_at`) VALUES
(30, 'scyllies@gmail.com', '426926', 15, 0, '2023-07-08 08:37:13', '2023-07-08 08:37:34'),
(31, 'scyllies@gmail.com', '286105', 15, 0, '2023-07-08 08:38:40', '2023-07-08 08:39:06'),
(35, 'scyllies@gmail.com', '864683', 15, 0, '2023-07-08 08:51:37', '2023-07-08 08:51:56'),
(37, 'MohamedSaleh18896@gmail.com', '177136', 15, 1, '2023-07-08 17:17:48', '2023-07-08 17:17:48'),
(52, 'scyllies@gmail.com', '927935', 15, 1, '2023-07-08 17:25:25', '2023-07-08 17:25:25');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playgrounds`
--

CREATE TABLE `playgrounds` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `location` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `price` varchar(255) NOT NULL,
  `size` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'pending',
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `rating` double(8,2) NOT NULL DEFAULT 0.00,
  `city` varchar(255) NOT NULL,
  `street` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `playgrounds`
--

INSERT INTO `playgrounds` (`id`, `name`, `location`, `description`, `image`, `price`, `size`, `type`, `status`, `user_id`, `created_at`, `updated_at`, `rating`, `city`, `street`) VALUES
(35, 'Mohamed Saleh2232', 'Menofia', 'df', '1688560332.png', '12', '12', 'paddle', 'done', 8, '2023-07-05 09:19:44', '2023-07-05 09:48:43', 5.00, 'Al Bagor', 'Met-Khoder'),
(36, 'Moha2', 'Qaliubiya', 'sdfgs', '1688561552.png', '123', '21', 'paddle', 'pending', 8, '2023-07-05 09:52:32', '2023-07-05 09:52:32', 0.00, 'Khanka', 'mansoura'),
(37, 'df22', 'Assiut', 'df', '1688670706.png', '12', '12', 'paddle', 'pending', 8, '2023-07-06 16:11:46', '2023-07-06 16:21:29', 0.00, 'Abnoub', '12'),
(38, 'Mohamed Saleh', 'Aswan', 'aasd', '1688734988.jpg', '12', '12', 'football', 'pending', 8, '2023-07-07 10:03:08', '2023-07-07 10:04:31', 3.00, 'Al Basilia', 'mansoura');

-- --------------------------------------------------------

--
-- Table structure for table `reservations`
--

CREATE TABLE `reservations` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `playground_id` bigint(20) UNSIGNED NOT NULL,
  `day` date NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `end_time` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'panding',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `reservations`
--

INSERT INTO `reservations` (`id`, `user_id`, `playground_id`, `day`, `start_time`, `end_time`, `status`, `created_at`, `updated_at`) VALUES
(1, 8, 35, '2023-07-07', '5:05 PM', '10:05 PM', 'panding', '2023-07-09 07:22:23', '2023-07-09 07:22:23'),
(2, 8, 35, '2023-07-07', '5:05 PM', '10:05 PM', 'panding', '2023-07-09 07:22:39', '2023-07-09 07:22:39'),
(3, 10, 35, '2023-07-07', '5:05 PM', '10:05 PM', 'panding', '2023-07-09 07:23:51', '2023-07-09 07:23:51'),
(4, 8, 35, '2023-07-07', '5:05 PM', '10:05 PM', 'panding', '2023-07-09 07:26:31', '2023-07-09 07:26:31'),
(5, 8, 35, '2023-07-07', '5:05 PM', '10:05 PM', 'panding', '2023-07-09 07:27:18', '2023-07-09 07:27:18'),
(6, 8, 35, '2023-07-07', '5:05 PM', '10:05 PM', 'panding', '2023-07-09 07:27:26', '2023-07-09 07:27:26'),
(7, 8, 35, '2023-07-07', '5:05 PM', '10:05 PM', 'panding', '2023-07-09 07:46:16', '2023-07-09 07:46:16'),
(8, 10, 35, '2023-07-07', '1:05 PM', '3:05 PM', 'panding', '2023-07-09 08:22:07', '2023-07-09 08:22:07'),
(9, 10, 35, '2023-07-07', '4:05 PM', '5:05 PM', 'panding', '2023-07-09 08:47:37', '2023-07-09 08:47:37'),
(10, 10, 35, '2023-07-07', '1:05 PM', '3:05 PM', 'panding', '2023-07-09 08:57:22', '2023-07-09 08:57:22'),
(11, 10, 35, '2023-07-07', '4:05 PM', '5:05 PM', 'panding', '2023-07-09 10:47:32', '2023-07-09 10:47:32'),
(12, 10, 35, '2023-07-07', '1:05 PM', '3:05 PM', 'panding', '2023-07-09 11:36:37', '2023-07-09 11:36:37'),
(13, 10, 35, '2023-07-07', '4:05 PM', '5:05 PM', 'panding', '2023-07-09 11:37:17', '2023-07-09 11:37:17'),
(14, 10, 35, '2023-07-07', '4:05 PM', '5:05 PM', 'panding', '2023-07-09 11:37:39', '2023-07-09 11:37:39'),
(15, 10, 35, '2023-07-07', '4:05 PM', '5:05 PM', 'panding', '2023-07-09 11:46:07', '2023-07-09 11:46:07'),
(16, 10, 35, '2023-07-07', '1:05 PM', '3:05 PM', 'panding', '2023-07-09 11:46:51', '2023-07-09 11:46:51'),
(17, 10, 35, '2023-07-07', '1:05 PM', '3:05 PM', 'panding', '2023-07-09 11:47:22', '2023-07-09 11:47:22');

-- --------------------------------------------------------

--
-- Table structure for table `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `playground_id` bigint(20) UNSIGNED NOT NULL,
  `review` varchar(255) NOT NULL,
  `rating` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `time_slots`
--

CREATE TABLE `time_slots` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `playground_id` bigint(20) UNSIGNED NOT NULL,
  `day` date NOT NULL,
  `start_time` varchar(255) NOT NULL,
  `end_time` varchar(255) NOT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'available',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `slot_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `time_slots`
--

INSERT INTO `time_slots` (`id`, `playground_id`, `day`, `start_time`, `end_time`, `status`, `created_at`, `updated_at`, `slot_id`) VALUES
(9, 35, '2023-07-07', '5:05 PM', '10:05 PM', 'holding', '2023-07-07 14:06:14', '2023-07-08 16:26:29', 6),
(10, 35, '2023-07-07', '1:05 PM', '3:05 PM', 'available', '2023-07-07 14:06:14', '2023-07-07 14:06:14', 6),
(11, 35, '2023-07-08', '9:06 PM', '11:06 PM', 'available', '2023-07-07 14:06:28', '2023-07-07 14:06:28', 7),
(12, 35, '2023-07-08', '9:06 PM', '11:06 PM', 'available', '2023-07-07 14:06:28', '2023-07-07 14:06:28', 7),
(13, 35, '2023-07-20', '10:58 PM', '11:58 PM', 'available', '2023-07-07 14:58:49', '2023-07-07 14:58:49', 8),
(14, 35, '2023-07-17', '5:25 PM', '6:27 PM', 'available', '2023-07-07 15:25:33', '2023-07-07 15:25:33', 9),
(15, 35, '2023-07-17', '6:28 PM', '10:27 PM', 'available', '2023-07-07 15:25:33', '2023-07-07 15:25:33', 9),
(16, 35, '2023-07-29', '11:49 PM', '11:53 PM', 'available', '2023-07-07 15:49:59', '2023-07-07 15:49:59', 10),
(17, 35, '2023-07-07', '4:05 PM', '5:05 PM', 'available', '2023-07-07 17:43:21', '2023-07-07 17:43:21', 6),
(18, 35, '2023-07-30', '5:22 PM', '8:22 PM', 'available', '2023-07-08 09:22:17', '2023-07-08 09:22:17', 7),
(19, 38, '2023-07-15', '7:25 PM', '10:25 PM', 'available', '2023-07-08 09:25:53', '2023-07-08 09:28:27', 8),
(20, 38, '2023-07-29', '4:27 PM', '7:27 PM', 'available', '2023-07-08 09:28:07', '2023-07-08 09:28:07', 9),
(21, 38, '2023-07-15', '3:28 PM', '6:28 PM', 'available', '2023-07-08 09:29:00', '2023-07-08 09:29:00', 8),
(22, 38, '2023-07-15', '7:30 PM', '11:30 PM', 'available', '2023-07-08 09:30:54', '2023-07-08 09:30:54', 8),
(24, 35, '2023-07-07', '8:05 PM', '11:29 PM', 'available', '2023-07-08 16:26:29', '2023-07-08 16:26:29', 6),
(25, 35, '2025-06-10', '12:22 PM', '2:22 PM', 'available', '2023-07-08 17:22:55', '2023-07-08 17:22:55', 7),
(26, 35, '2023-07-31', '2:00 AM', '3:00 AM', 'available', '2023-07-08 17:39:20', '2023-07-08 17:39:20', 8);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `role`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(8, 'Mohamed Saleh', 'scyllies@gmail.com', '+201550191001', 'owner', NULL, '$2y$10$WjEWE8IcplMQQmZkYINcweKAOWJ.OBUiRYJKGXFt2gHZ9ihBaEb7u', NULL, '2023-07-01 13:40:35', '2023-07-08 08:51:56'),
(9, 'mohamed saleh', 'MohamedSaleh18896@gmail.com', '01550191001', 'admin', NULL, '$2y$10$CgS.o6ZxJgVIzEja8etWwe0lRyIlpye7OFwvHXFIT.iQwP4K9Wpfe', NULL, '2023-07-05 09:47:51', '2023-07-05 09:47:51'),
(10, 'Mohamed Saleh', 'scy@gmail.com', '01550191001', 'player', NULL, '$2y$10$twJ0H5TJx.hoCBW.XNUdS.0eeMjrTic/jL41cHciG/LPrTxdKTLRW', NULL, '2023-07-08 15:14:14', '2023-07-08 15:14:14');

-- --------------------------------------------------------

--
-- Table structure for table `websockets_statistics_entries`
--

CREATE TABLE `websockets_statistics_entries` (
  `id` int(10) UNSIGNED NOT NULL,
  `app_id` varchar(255) NOT NULL,
  `peak_connection_count` int(11) NOT NULL,
  `websocket_message_count` int(11) NOT NULL,
  `api_message_count` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `chat_messages_sender_id_foreign` (`sender_id`),
  ADD KEY `chat_messages_receiver_id_foreign` (`receiver_id`);

--
-- Indexes for table `complaints`
--
ALTER TABLE `complaints`
  ADD PRIMARY KEY (`id`),
  ADD KEY `complaints_user_id_foreign` (`user_id`),
  ADD KEY `complaints_playground_id_foreign` (`playground_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_user_id_foreign` (`user_id`),
  ADD KEY `favorites_playground_id_foreign` (`playground_id`);

--
-- Indexes for table `image_play_grounds`
--
ALTER TABLE `image_play_grounds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `image_play_grounds_playgrounds_id_foreign` (`playgrounds_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `otps`
--
ALTER TABLE `otps`
  ADD PRIMARY KEY (`id`),
  ADD KEY `otps_id_index` (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `playgrounds`
--
ALTER TABLE `playgrounds`
  ADD PRIMARY KEY (`id`),
  ADD KEY `playgrounds_user_id_foreign` (`user_id`);

--
-- Indexes for table `reservations`
--
ALTER TABLE `reservations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reservations_user_id_foreign` (`user_id`),
  ADD KEY `reservations_playground_id_foreign` (`playground_id`);

--
-- Indexes for table `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`),
  ADD KEY `reviews_playground_id_foreign` (`playground_id`);

--
-- Indexes for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD PRIMARY KEY (`id`),
  ADD KEY `time_slots_playground_id_foreign` (`playground_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `complaints`
--
ALTER TABLE `complaints`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

--
-- AUTO_INCREMENT for table `image_play_grounds`
--
ALTER TABLE `image_play_grounds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `otps`
--
ALTER TABLE `otps`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `playgrounds`
--
ALTER TABLE `playgrounds`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=39;

--
-- AUTO_INCREMENT for table `reservations`
--
ALTER TABLE `reservations`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `time_slots`
--
ALTER TABLE `time_slots`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `websockets_statistics_entries`
--
ALTER TABLE `websockets_statistics_entries`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `chat_messages_receiver_id_foreign` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `chat_messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `complaints`
--
ALTER TABLE `complaints`
  ADD CONSTRAINT `complaints_playground_id_foreign` FOREIGN KEY (`playground_id`) REFERENCES `playgrounds` (`id`),
  ADD CONSTRAINT `complaints_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_playground_id_foreign` FOREIGN KEY (`playground_id`) REFERENCES `playgrounds` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `image_play_grounds`
--
ALTER TABLE `image_play_grounds`
  ADD CONSTRAINT `image_play_grounds_playgrounds_id_foreign` FOREIGN KEY (`playgrounds_id`) REFERENCES `playgrounds` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `playgrounds`
--
ALTER TABLE `playgrounds`
  ADD CONSTRAINT `playgrounds_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reservations`
--
ALTER TABLE `reservations`
  ADD CONSTRAINT `reservations_playground_id_foreign` FOREIGN KEY (`playground_id`) REFERENCES `playgrounds` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reservations_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_playground_id_foreign` FOREIGN KEY (`playground_id`) REFERENCES `playgrounds` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `time_slots`
--
ALTER TABLE `time_slots`
  ADD CONSTRAINT `time_slots_playground_id_foreign` FOREIGN KEY (`playground_id`) REFERENCES `playgrounds` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
