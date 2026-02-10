-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : mar. 10 fév. 2026 à 14:05
-- Version du serveur : 8.4.3
-- Version de PHP : 8.3.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `projet_marsai`
--

-- --------------------------------------------------------

--
-- Structure de la table `admin_video`
--

CREATE TABLE `admin_video` (
  `id` int NOT NULL,
  `status` enum('Video Accepted','Video Rejected','Video Banned','Featured') DEFAULT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change',
  `video_id` int NOT NULL,
  `score` decimal(4,2) DEFAULT NULL,
  `admin_user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `admin_video`
--

INSERT INTO `admin_video` (`id`, `status`, `comment`, `created_at`, `updated_at`, `video_id`, `score`, `admin_user_id`) VALUES
(1, 'Video Accepted', NULL, '2026-02-06 11:21:54', '2026-02-06 11:21:54', 4, 9.40, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `assignment`
--

CREATE TABLE `assignment` (
  `id` int NOT NULL,
  `assignated_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `awards`
--

CREATE TABLE `awards` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `img` varchar(250) NOT NULL,
  `rank` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `awards_video`
--

CREATE TABLE `awards_video` (
  `award_id` int NOT NULL,
  `video_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `bookings`
--

CREATE TABLE `bookings` (
  `id` int NOT NULL,
  `event_id` int NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `cms`
--

CREATE TABLE `cms` (
  `id` int NOT NULL,
  `page` varchar(50) NOT NULL DEFAULT 'home',
  `section` varchar(50) NOT NULL DEFAULT 'global',
  `content_key` varchar(100) NOT NULL,
  `locale` varchar(5) NOT NULL DEFAULT 'fr',
  `type` enum('text','richtext','image','url','number','json') NOT NULL DEFAULT 'text',
  `value` longtext,
  `order_index` int NOT NULL DEFAULT '0',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `cms`
--

INSERT INTO `cms` (`id`, `page`, `section`, `content_key`, `locale`, `type`, `value`, `order_index`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'home', 'hero', 'title', 'fr', 'text', 'MARSAI', 0, 1, '2026-02-05 14:21:53', '2026-02-05 16:17:05'),
(2, 'home', 'hero', 'title', 'en', 'text', 'MARSAI', 0, 1, '2026-02-05 14:21:53', '2026-02-05 16:17:13'),
(3, 'home', 'hero', 'protocol', 'fr', 'text', 'le protocole temporel 2026', 0, 1, '2026-02-05 16:28:47', '2026-02-10 11:06:17'),
(4, 'home', 'hero', 'tagline_before', 'fr', 'text', 'Imaginez des', 3, 1, '2026-02-05 16:28:47', '2026-02-09 15:36:36'),
(5, 'home', 'hero', 'tagline_highlight', 'fr', 'text', 'Futurs', 4, 1, '2026-02-05 16:28:47', '2026-02-09 15:36:36'),
(6, 'home', 'hero', 'tagline_after', 'fr', 'text', 'souhaitables', 5, 1, '2026-02-05 16:28:47', '2026-02-09 15:36:36'),
(7, 'home', 'hero', 'desc1', 'fr', 'text', 'Le festival de courts-métrages de 60 secondes réalisés par IA.', 6, 1, '2026-02-05 16:28:47', '2026-02-09 15:36:36'),
(8, 'home', 'hero', 'desc2', 'fr', 'text', '2 jours d\'immersion au cœur de Marseille.', 7, 1, '2026-02-05 16:28:47', '2026-02-09 15:36:36'),
(9, 'home', 'hero', 'ctaParticipate', 'fr', 'text', 'Participer', 8, 1, '2026-02-05 16:28:47', '2026-02-09 15:36:36'),
(10, 'home', 'hero', 'ctaLearnMore', 'fr', 'text', 'En savoir plus', 10, 1, '2026-02-05 16:28:47', '2026-02-10 11:25:02'),
(11, 'home', 'hero', 'protocol', 'en', 'text', 'the 2026 temporal protocol', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(12, 'home', 'hero', 'tagline_before', 'en', 'text', 'Imagine', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(13, 'home', 'hero', 'tagline_highlight', 'en', 'text', 'Futures', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(14, 'home', 'hero', 'tagline_after', 'en', 'text', 'worth imagining', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(15, 'home', 'hero', 'desc1', 'en', 'text', 'the 60-second short film festival', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(16, 'home', 'hero', 'desc2', 'en', 'text', '2 days of immersion in the heart of Marseille.', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(17, 'home', 'hero', 'ctaParticipate', 'en', 'text', 'Participate', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(18, 'home', 'hero', 'ctaLearnMore', 'en', 'text', 'Learn more', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(19, 'home', 'hero', 'title_main', 'fr', 'text', 'mars', 0, 1, '2026-02-05 16:32:23', '2026-02-10 11:10:18'),
(20, 'home', 'hero', 'title_accent', 'fr', 'text', 'ai', 2, 1, '2026-02-05 16:32:23', '2026-02-09 15:36:36'),
(21, 'home', 'hero', 'title_main', 'en', 'text', 'MARS', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(22, 'home', 'hero', 'title_accent', 'en', 'text', 'AI', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(23, 'home', 'hero', 'ctaLearnMore_signe', 'fr', 'text', '+', 11, 1, '2026-02-06 09:54:31', '2026-02-10 11:25:02'),
(24, 'home', 'hero', 'ctaLearnMore_signe', 'en', 'text', '+', 0, 1, '2026-02-06 09:54:31', '2026-02-06 09:54:31'),
(25, 'home', 'hero', 'ctaParticipate_signe', 'fr', 'text', '/uploads/icons/1770724180233-arrowRight.svg', 9, 1, '2026-02-09 10:41:35', '2026-02-10 12:49:40'),
(26, 'home', 'hero', 'ctaParticipate_signe', 'en', 'text', NULL, 0, 1, '2026-02-09 10:41:35', '2026-02-09 10:41:35'),
(27, 'home', 'hero', 'protocol_icon', 'fr', 'image', '/uploads/icons/1770724905062-star.png', 1, 1, '2026-02-10 11:59:41', '2026-02-10 13:01:45'),
(32, 'home', 'hero', 'protocol_icon', 'en', 'image', '../src/assets/imgs/icones/iconStars.svg', 0, 1, '2026-02-10 12:53:13', '2026-02-10 12:53:13'),
(33, 'home', 'concept', 'title_main', 'fr', 'text', 'Concept du festival MARSAI', 0, 1, '2026-02-10 14:11:53', '2026-02-10 14:33:15'),
(34, 'home', 'concept', 'card1_title', 'fr', 'text', '1 minute', 1, 1, '2026-02-10 14:11:53', '2026-02-10 14:11:53'),
(35, 'home', 'concept', 'card1_description', 'fr', 'text', 'Format ultra-court pour un impact maximum.', 2, 1, '2026-02-10 14:11:53', '2026-02-10 14:11:53'),
(36, 'home', 'concept', 'card2_title', 'fr', 'text', 'Gratuité', 3, 1, '2026-02-10 14:11:53', '2026-02-10 14:11:53'),
(37, 'home', 'concept', 'card2_description', 'fr', 'text', 'Conférences et workshops accessibles.', 4, 1, '2026-02-10 14:11:53', '2026-02-10 14:11:53'),
(38, 'home', 'concept', 'card3_title', 'fr', 'text', 'Pour tous', 5, 1, '2026-02-10 14:11:53', '2026-02-10 14:11:53'),
(39, 'home', 'concept', 'card3_description', 'fr', 'text', 'Professionnels, étudiants et curieux.', 6, 1, '2026-02-10 14:11:53', '2026-02-10 14:11:53'),
(40, 'home', 'concept', 'card4_title', 'fr', 'text', 'Expertise', 7, 1, '2026-02-10 14:11:53', '2026-02-10 14:11:53'),
(41, 'home', 'concept', 'card4_description', 'fr', 'text', 'Leaders mondiaux de l’IA générative.', 8, 1, '2026-02-10 14:11:53', '2026-02-10 14:11:53'),
(42, 'home', 'concept', 'title_main', 'en', 'text', 'MARSAI Festival Concept', 0, 0, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(43, 'home', 'concept', 'card1_title', 'en', 'text', '1 minute', 1, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(44, 'home', 'concept', 'card1_description', 'en', 'text', 'Ultra-short format for maximum impact.', 2, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(45, 'home', 'concept', 'card2_title', 'en', 'text', 'Free access', 3, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(46, 'home', 'concept', 'card2_description', 'en', 'text', 'Talks and workshops are accessible.', 4, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(47, 'home', 'concept', 'card3_title', 'en', 'text', 'For everyone', 5, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(48, 'home', 'concept', 'card3_description', 'en', 'text', 'Professionals, students, and curious minds.', 6, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(49, 'home', 'concept', 'card4_title', 'en', 'text', 'Expertise', 7, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(50, 'home', 'concept', 'card4_description', 'en', 'text', 'World leaders in generative AI.', 8, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48');

-- --------------------------------------------------------

--
-- Structure de la table `contact_messages`
--

CREATE TABLE `contact_messages` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `subject` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `last_name`, `subject`, `email`, `message`, `created_at`) VALUES
(1, 'Ocean', 'Breeze', 'Test formulaire', 'ocean@test.com', 'Ceci est un message de test', '2026-02-04 11:27:48'),
(2, 'Biamonti', 'Vanessa', 'why oh why?', 'vanessa.biamonti@gmail.com', 'Hello ya! How are ya ?', '2026-02-04 13:15:19');

-- --------------------------------------------------------

--
-- Structure de la table `contributor`
--

CREATE TABLE `contributor` (
  `id` int NOT NULL,
  `video_id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `gender` enum('Mr','Mrs') NOT NULL,
  `email` varchar(255) NOT NULL,
  `profession` varchar(155) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contributor`
--

INSERT INTO `contributor` (`id`, `video_id`, `name`, `last_name`, `gender`, `email`, `profession`, `created_at`, `updated_at`) VALUES
(1, 7, 'CACA', 'Pipi', 'Mr', 'test123@mail.com', 'Pipo', '2026-02-04 13:12:34', '2026-02-04 13:12:34');

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text,
  `date` datetime NOT NULL,
  `length` int NOT NULL,
  `stock` int DEFAULT NULL,
  `illustration` varchar(255) NOT NULL,
  `location` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change',
  `published` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `faq`
--

CREATE TABLE `faq` (
  `id` int NOT NULL,
  `question` varchar(500) NOT NULL,
  `answer` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `film_tag`
--

CREATE TABLE `film_tag` (
  `tag_id` int NOT NULL,
  `video_id` int NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `jury`
--

CREATE TABLE `jury` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `img` varchar(255) NOT NULL,
  `bio` varchar(500) DEFAULT NULL,
  `profession` varchar(100) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change',
  `role_label` varchar(80) DEFAULT NULL,
  `is_president` tinyint(1) NOT NULL DEFAULT '0',
  `filmography_url` varchar(500) DEFAULT NULL,
  `sort_order` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `jury`
--

INSERT INTO `jury` (`id`, `name`, `first_name`, `img`, `bio`, `profession`, `created_at`, `updated_at`, `role_label`, `is_president`, `filmography_url`, `sort_order`) VALUES
(1, 'VALROS', 'JULIEN', 'julien.png', '...', 'Réalisateur', '2026-02-06 13:11:39', '2026-02-06 13:11:39', 'PRÉSIDENT DU JURY', 1, 'https://exemple.com', 1),
(2, 'MASSON', 'JULIE', 'julie.png', '...', 'Productrice', '2026-02-06 13:11:39', '2026-02-06 13:11:39', 'PRODUCTRICE', 0, 'https://exemple.com', 2);

-- --------------------------------------------------------

--
-- Structure de la table `memo_selector`
--

CREATE TABLE `memo_selector` (
  `id` int NOT NULL,
  `rating` int NOT NULL,
  `status` enum('Accepted','Rejected','To be processed') NOT NULL,
  `comment` varchar(500) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `newsletters`
--

CREATE TABLE `newsletters` (
  `id` int NOT NULL,
  `subject` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `content_json` json NOT NULL,
  `background_color` varchar(32) DEFAULT NULL,
  `status` enum('draft','scheduled','sending','sent') NOT NULL DEFAULT 'draft',
  `scheduled_at` datetime DEFAULT NULL,
  `sent_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `newsletters`
--

INSERT INTO `newsletters` (`id`, `subject`, `title`, `content_json`, `background_color`, `status`, `scheduled_at`, `sent_at`, `created_at`, `updated_at`) VALUES
(1, 'MarsAI — Newsletter #1', 'Bienvenue', '{\"blocks\": [{\"text\": \"Hello MarsAI\", \"type\": \"h1\"}, {\"text\": \"Ceci est un test de newsletter.\", \"type\": \"p\"}, {\"type\": \"divider\"}]}', '#ffffff', 'sent', NULL, '2026-02-10 14:02:45', '2026-02-10 12:04:10', '2026-02-10 14:02:45');

-- --------------------------------------------------------

--
-- Structure de la table `newsletter_deliveries`
--

CREATE TABLE `newsletter_deliveries` (
  `id` int NOT NULL,
  `newsletter_id` int NOT NULL,
  `subscriber_id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `status` enum('sent','failed') NOT NULL,
  `error_message` text,
  `sent_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `newsletter_deliveries`
--

INSERT INTO `newsletter_deliveries` (`id`, `newsletter_id`, `subscriber_id`, `email`, `status`, `error_message`, `sent_at`) VALUES
(1, 1, 2, 'toi@example.com', 'sent', NULL, '2026-02-10 14:02:44'),
(2, 1, 3, 'moi@example.com', 'failed', 'Data command failed: 550 5.7.0 Too many emails per second. Please upgrade your plan https://mailtrap.io/billing/plans/testing', '2026-02-10 14:02:45');

-- --------------------------------------------------------

--
-- Structure de la table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `unsubscribed_at` timestamp NULL DEFAULT NULL,
  `status` enum('pending','active') NOT NULL DEFAULT 'pending',
  `consent_at` datetime DEFAULT NULL,
  `confirm_token` varchar(255) DEFAULT NULL,
  `confirm_expires_at` datetime DEFAULT NULL,
  `confirmed_at` datetime DEFAULT NULL,
  `unsubscribe_token` varchar(255) DEFAULT NULL,
  `last_sent_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `created_at`, `unsubscribed_at`, `status`, `consent_at`, `confirm_token`, `confirm_expires_at`, `confirmed_at`, `unsubscribe_token`, `last_sent_at`) VALUES
(1, 'test123@gmail.com', '2026-02-05 14:33:17', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'toi@example.com', '2026-02-10 09:59:35', NULL, 'active', '2026-02-10 10:59:36', NULL, NULL, '2026-02-10 11:05:12', '0ab5de47b16b20d460ba9a99f86e5672d969e30ef9a4a9bdb0b72186eafcd6ed', NULL),
(3, 'moi@example.com', '2026-02-10 10:05:33', NULL, 'active', '2026-02-10 11:14:22', 'f3856310a1873b7bac740c6d92d54a40a630abe91124acd6800f882e40624800', '2026-02-11 11:14:22', '2026-02-10 11:05:43', 'c751c178fb86aca2b68e0b0c3cf473dfa4fac4d2a9cf21a221781a65a7a112e6', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `parameters`
--

CREATE TABLE `parameters` (
  `id` int NOT NULL,
  `submission_open_at` date DEFAULT NULL,
  `submission_close_at` date DEFAULT NULL,
  `max_duration_seconds` int DEFAULT NULL,
  `festival_name` varchar(255) DEFAULT NULL,
  `event_description` varchar(1000) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `partner`
--

CREATE TABLE `partner` (
  `id` int NOT NULL,
  `name` varchar(255) NOT NULL,
  `img` varchar(250) NOT NULL,
  `url` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `partner`
--

INSERT INTO `partner` (`id`, `name`, `img`, `url`, `created_at`, `updated_at`) VALUES
(1, 'unric', '/uploads/logoPartners/1770650983832-unric_logo-standard-e1629825347279.png', NULL, '2026-02-09 16:29:43', '2026-02-09 16:29:43'),
(2, 'undp', '/uploads/logoPartners/1770651028440-undp-logo-blue-large-1-1-e1629824955655.png', NULL, '2026-02-09 16:30:28', '2026-02-09 16:30:28'),
(3, 'sdg_action', '/uploads/logoPartners/1770651044971-un_sdg_action_campaign_horizontal-e1629823111796.png', NULL, '2026-02-09 16:30:44', '2026-02-09 16:30:44'),
(4, 'psl', '/uploads/logoPartners/1770651057617-psl-1-e1629374159330.png', NULL, '2026-02-09 16:30:57', '2026-02-09 16:30:57'),
(5, 'sns', '/uploads/logoPartners/1770651066880-matrice-logo-e1629825375865.png', NULL, '2026-02-09 16:31:06', '2026-02-09 16:31:06'),
(6, 'sacd', '/uploads/logoPartners/1770651080570-logo_sacd-e1629892609581.png', NULL, '2026-02-09 16:31:20', '2026-02-09 16:31:20'),
(7, 'gybn', '/uploads/logoPartners/1770651090428-logo_gybn_vertical-1-e1629825431327.png', NULL, '2026-02-09 16:31:30', '2026-02-09 16:31:30');

-- --------------------------------------------------------

--
-- Structure de la table `social_media`
--

CREATE TABLE `social_media` (
  `id` int NOT NULL,
  `instagram` varchar(500) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `tiktok` varchar(500) DEFAULT NULL,
  `linkedin` varchar(500) DEFAULT NULL,
  `youtube` varchar(500) DEFAULT NULL,
  `website` varchar(500) DEFAULT NULL,
  `x` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `still`
--

CREATE TABLE `still` (
  `id` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `video_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `still`
--

INSERT INTO `still` (`id`, `file_name`, `video_id`) VALUES
(2, '1770022546997-745183-sankaku_john_baldessari_art_--v_7_7d750db0-c595-4d24-8364-1efbdeeeced4.png', 4),
(3, '1770025470482-577707-ethopstudio_black_and_white_blurred_photograph_of_people_dancin_2df345e4-8c33-4c1d-8515-972758658476.png', 5),
(4, '1770037126201-841805-Sans_titre__Pr__sentation___5_.jpg', 6),
(5, '1770037126205-322060-Capture_d___cran_2026-02-02_094320.png', 6),
(6, '1770037126205-760925-MarsAI_Film_Festival-2026_ABOUT__1_.jpg', 6),
(7, '1770207153926-434493-korog.art_An_hells_gate_--v_7_f639f163-0927-4d0d-8dbe-ac00144c3afb.png', 7),
(8, '1770288198692-531971-u7389435774_1977_London_punk_era_hyper-realistic_cinematic_arch_01ef2320-0074-44b4-8999-897af9a08efe.png', 8),
(9, '1770290692244-408831-MarsAI_Film_Festival-2026_ABOUT__Pr__sentation_.jpg', 9),
(10, '1770290989726-20633-ethopstudio_black_and_white_blurred_photograph_of_people_dancin_2df345e4-8c33-4c1d-8515-972758658476.png', 10);

-- --------------------------------------------------------

--
-- Structure de la table `tag`
--

CREATE TABLE `tag` (
  `id` int NOT NULL,
  `name` varchar(55) DEFAULT NULL,
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change',
  `created_at` datetime NOT NULL DEFAULT (now())
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `tags`
--

CREATE TABLE `tags` (
  `id` int NOT NULL,
  `name` varchar(80) NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `tags`
--

INSERT INTO `tags` (`id`, `name`, `created_at`) VALUES
(1, 'science-fiction', '2026-02-05 10:43:20'),
(2, 'bio', '2026-02-05 11:24:53');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `role` varchar(100) NOT NULL,
  `name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `videos`
--

CREATE TABLE `videos` (
  `id` int NOT NULL,
  `youtube_video_id` varchar(250) DEFAULT NULL,
  `video_file_name` varchar(250) NOT NULL,
  `title` varchar(100) NOT NULL,
  `title_en` varchar(100) NOT NULL,
  `synopsis` varchar(500) NOT NULL,
  `synopsis_en` varchar(500) NOT NULL,
  `cover` varchar(250) NOT NULL,
  `language` varchar(100) NOT NULL,
  `country` varchar(100) NOT NULL,
  `duration` int NOT NULL,
  `tech_resume` varchar(500) NOT NULL,
  `ai_tech` varchar(100) NOT NULL,
  `creative_resume` varchar(500) NOT NULL,
  `email` varchar(255) NOT NULL,
  `director_name` varchar(100) NOT NULL,
  `director_lastname` varchar(100) NOT NULL,
  `director_gender` enum('Mrs','Mr') NOT NULL,
  `birthday` date NOT NULL,
  `mobile_number` varchar(20) DEFAULT NULL,
  `home_number` varchar(20) DEFAULT NULL,
  `address` varchar(250) NOT NULL,
  `director_country` varchar(50) NOT NULL,
  `discovery_source` varchar(50) NOT NULL,
  `upload_status` enum('Pending','Uploading','Processing','Published','Rejected','Failed') NOT NULL DEFAULT 'Pending',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `featured` tinyint(1) NOT NULL DEFAULT '0',
  `ownership_certified` tinyint(1) NOT NULL DEFAULT '0',
  `ownership_certified_at` datetime DEFAULT NULL,
  `promo_consent` tinyint(1) NOT NULL DEFAULT '0',
  `promo_consent_at` datetime DEFAULT NULL,
  `youtube_upload_error` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `videos`
--

INSERT INTO `videos` (`id`, `youtube_video_id`, `video_file_name`, `title`, `title_en`, `synopsis`, `synopsis_en`, `cover`, `language`, `country`, `duration`, `tech_resume`, `ai_tech`, `creative_resume`, `email`, `director_name`, `director_lastname`, `director_gender`, `birthday`, `mobile_number`, `home_number`, `address`, `director_country`, `discovery_source`, `upload_status`, `created_at`, `featured`, `ownership_certified`, `ownership_certified_at`, `promo_consent`, `promo_consent_at`, `youtube_upload_error`) VALUES
(4, NULL, '1770022546953-878781-MarseillefutureGoodone3.mp4', 'Vue sur Marseille', 'View on Marseille', 'Magnifique vue sur Marseille', 'Beautiful view on Marseille', '1770022546993-180497-Sans_titre__Pr__sentation___2_.jpg', 'fr', 'FR', 120, 'sdkcjdkfjzekflnezfklnef', 'Midjourney', 'scklskclmqssqmds', 'vanessa.biamonti@laplate.com', 'Vanessa', 'Callea', 'Mrs', '1995-12-11', '+33650925487', '0556789876', '13 rue Exemple, Paris', 'FR', 'Facebook', 'Published', '2026-02-03 10:09:27', 0, 0, NULL, 0, NULL, NULL),
(5, NULL, '1770025470430-682094-MarseillefutureGoodone2.mp4', 'Les beaux jours', 'Beautiful days', 'sdfjkzejfsdkslfsjdjfklsdfkl', 'qdflvdf;v,dslv,df;v', '1770025470480-428870-Sans_titre__Pr__sentation___3_.jpg', 'fr', 'France', 120, 'ksdcsdlcksdfl', 'Midjourney', 'wx wx;,', 'vanessa.biamonti@gmail.com', 'Julie', 'Callea', 'Mrs', '1977-07-21', NULL, NULL, '15 rue Exemple, Paris', 'France', 'Facebook', 'Published', '2026-02-03 10:09:27', 0, 0, NULL, 0, NULL, NULL),
(6, NULL, '1770037126155-987006-MarseillefutureGoodone3.mp4', 'Video bebe', 'Video Baby', 'sd;v;dsvsd;:v', 'qslcqslmclmqsclmqs', '1770037126194-723445-Sans_titre__Pr__sentation___7_.jpg', 'fr', 'France', 60, 'djfsdjkfjsdfjkd', 'Midjourney', 'sd,c,sdqcf,sd,;sd,;', 'test2@mail.com', 'Biamonti', 'Callea', 'Mr', '2008-06-14', '0650925488', NULL, '16 rue Exemple, Paris', 'Australia', 'Facebook', 'Published', '2026-02-03 10:09:27', 0, 0, NULL, 0, NULL, NULL),
(7, NULL, '1770207153587-937416-vanessdev_Marseille_in_a_desirable_future_black_and_white_cin_fc2947f3-1740-42ee-bfc4-aedeef052256_2.mp4', 'dsdsvds', 'ddcdssdvsd', 'qssqqs', 'sqqsqs', '1770207153812-118295-sankaku_john_baldessari_art_--v_7_7d750db0-c595-4d24-8364-1efbdeeeced4.png', 'nl', 'Anguilla', 60, 'xdsdsqsqqs', 'Midjourney', 'sddssd', 'vanessa.biamonti@laplate.com', 'Juliette', 'Ravioli', 'Mr', '1986-11-20', '0650925487', NULL, '14 rue Exemple, Paris', 'Antigua and Barbuda', 'Facebook', 'Published', '2026-02-04 13:12:33', 0, 1, '2026-02-04 13:12:34', 1, '2026-02-04 13:12:34', NULL),
(8, NULL, '1770288198272-43207-vanessdev_Marseille_in_a_desirable_future_black_and_white_cin_fc2947f3-1740-42ee-bfc4-aedeef052256_2.mp4', 'Pascale est bête', 'Pascale is stupid', 'on s\'en fiche', 'we don\'t care', '1770288198673-560183-malbich8_a_black_and_white_photo_of_an_angel_baby_cholo_wearing_0a86c5ec-2866-43a3-85d9-83766948d1f6.png', 'fr', 'France', 60, 'efgfegerger', 'Midjourney', 'gfergregregre', 'p.aubier@test.com', 'Pascale', 'Aubier', 'Mrs', '1973-05-16', '0650925487', NULL, '26 rue Exemple, Paris', 'France', 'Facebook', 'Published', '2026-02-05 11:43:18', 0, 1, '2026-02-05 11:43:20', 1, '2026-02-05 11:43:20', NULL),
(9, NULL, '1770290692013-334990-vanessdev_futuristic_Provence_lavender_fields_autonomous_dron_f841c869-d7ab-44c5-ab70-1d5066da68a0_1.mp4', 'Test youtube API', 'Youtube API test', 'sdfvsddsf', 'dvsdfvdfdsf', '1770290692215-504971-hamcybele_photographic_grim_reaper_graphic_design_1960s_design__99877147-6258-4ce0-8450-15b594fb8db4.png', 'fr', 'Anguilla', 60, 'sdvsdfsdf', 'Midjourney', 'sddgfsdfd', 'g.gauliter@test.com', 'Ghislaine', 'Gaultier', 'Mrs', '1983-10-27', '0650925487', NULL, '15 rue Exemple, Paris', 'Australia', 'Facebook', 'Published', '2026-02-05 12:24:52', 0, 1, '2026-02-05 12:24:53', 1, '2026-02-05 12:24:53', NULL),
(10, 'wcy5srKTzbk', '1770290989616-973820-gersto_A_dramatic_black-and-white_film-noir-style_scene_of_a__eed6a183-af7c-4864-ae6c-f81f9949c760_0.mp4', 'C\'est la bonne cette fois', 'This time it works', 'xvvsdvsd', 'svsdvsdv', '1770290989671-508681-sankaku_john_baldessari_art_--v_7_7d750db0-c595-4d24-8364-1efbdeeeced4.png', 'es', 'Albania', 60, 'xvvsccv', 'Midjourney', 'cvcsvc', 'g.fion@gmail.com', 'Gwenaelle', 'FION', 'Mrs', '1990-09-20', '0650925487', NULL, '14 rue Exemple, Paris', 'Algeria', 'Facebook', 'Published', '2026-02-05 12:29:49', 0, 1, '2026-02-05 12:29:53', 1, '2026-02-05 12:29:53', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `video_subtitles`
--

CREATE TABLE `video_subtitles` (
  `id` int NOT NULL,
  `video_id` int NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `language` varchar(10) DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `video_subtitles`
--

INSERT INTO `video_subtitles` (`id`, `video_id`, `file_name`, `language`, `created_at`) VALUES
(2, 4, '1770022547060-458523-soustitre.srt', NULL, '2026-02-02 09:55:47'),
(3, 5, '1770025470507-840368-soustitre.srt', NULL, '2026-02-02 10:44:30'),
(4, 6, '1770037126209-761699-soustitre.srt', NULL, '2026-02-02 13:58:46'),
(5, 7, '1770207153954-129470-soustitre.srt', NULL, '2026-02-04 13:12:34'),
(6, 8, '1770288198747-822692-soustitre.srt', NULL, '2026-02-05 11:43:20'),
(7, 9, '1770290692247-398099-soustitre.srt', NULL, '2026-02-05 12:24:53'),
(8, 10, '1770290989733-348272-soustitre.srt', NULL, '2026-02-05 12:29:52');

-- --------------------------------------------------------

--
-- Structure de la table `video_tag`
--

CREATE TABLE `video_tag` (
  `video_id` int NOT NULL,
  `tag_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `video_tag`
--

INSERT INTO `video_tag` (`video_id`, `tag_id`) VALUES
(8, 1),
(9, 1),
(10, 1),
(9, 2),
(10, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin_video`
--
ALTER TABLE `admin_video`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uq_admin_video_video` (`video_id`),
  ADD KEY `fk_admin_video_user` (`admin_user_id`);

--
-- Index pour la table `assignment`
--
ALTER TABLE `assignment`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `awards`
--
ALTER TABLE `awards`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `awards_video`
--
ALTER TABLE `awards_video`
  ADD PRIMARY KEY (`award_id`,`video_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Index pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `unique_booking_per_event_email` (`event_id`,`email`),
  ADD KEY `idx_bookings_event_id` (`event_id`);

--
-- Index pour la table `cms`
--
ALTER TABLE `cms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_block` (`page`,`section`,`content_key`,`locale`),
  ADD KEY `idx_page_locale` (`page`,`locale`),
  ADD KEY `idx_section` (`section`),
  ADD KEY `idx_active_order` (`is_active`,`order_index`);

--
-- Index pour la table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `contributor`
--
ALTER TABLE `contributor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_contributor_video_id` (`video_id`);

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `faq`
--
ALTER TABLE `faq`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `film_tag`
--
ALTER TABLE `film_tag`
  ADD PRIMARY KEY (`tag_id`,`video_id`),
  ADD KEY `video_id` (`video_id`);

--
-- Index pour la table `jury`
--
ALTER TABLE `jury`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_jury_sort` (`is_president`,`sort_order`,`id`);

--
-- Index pour la table `memo_selector`
--
ALTER TABLE `memo_selector`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `newsletter_deliveries`
--
ALTER TABLE `newsletter_deliveries`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_delivery` (`newsletter_id`,`subscriber_id`),
  ADD KEY `idx_newsletter` (`newsletter_id`);

--
-- Index pour la table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `uq_newsletter_email` (`email`),
  ADD UNIQUE KEY `uq_newsletter_confirm_token` (`confirm_token`),
  ADD UNIQUE KEY `uq_newsletter_unsub_token` (`unsubscribe_token`);

--
-- Index pour la table `parameters`
--
ALTER TABLE `parameters`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `partner`
--
ALTER TABLE `partner`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `social_media`
--
ALTER TABLE `social_media`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `still`
--
ALTER TABLE `still`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_still_video_id` (`video_id`);

--
-- Index pour la table `tag`
--
ALTER TABLE `tag`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `video_subtitles`
--
ALTER TABLE `video_subtitles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_video_subtitles_video_id` (`video_id`);

--
-- Index pour la table `video_tag`
--
ALTER TABLE `video_tag`
  ADD PRIMARY KEY (`video_id`,`tag_id`),
  ADD KEY `fk_video_tag_tag` (`tag_id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `admin_video`
--
ALTER TABLE `admin_video`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `assignment`
--
ALTER TABLE `assignment`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `awards`
--
ALTER TABLE `awards`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `cms`
--
ALTER TABLE `cms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT pour la table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `contributor`
--
ALTER TABLE `contributor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `jury`
--
ALTER TABLE `jury`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `memo_selector`
--
ALTER TABLE `memo_selector`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `newsletters`
--
ALTER TABLE `newsletters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `newsletter_deliveries`
--
ALTER TABLE `newsletter_deliveries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `parameters`
--
ALTER TABLE `parameters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `social_media`
--
ALTER TABLE `social_media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `still`
--
ALTER TABLE `still`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `tags`
--
ALTER TABLE `tags`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `video_subtitles`
--
ALTER TABLE `video_subtitles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admin_video`
--
ALTER TABLE `admin_video`
  ADD CONSTRAINT `fk_admin_video_user` FOREIGN KEY (`admin_user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `fk_admin_video_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `assignment`
--
ALTER TABLE `assignment`
  ADD CONSTRAINT `assignment_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `awards_video`
--
ALTER TABLE `awards_video`
  ADD CONSTRAINT `awards_video_ibfk_1` FOREIGN KEY (`award_id`) REFERENCES `awards` (`id`),
  ADD CONSTRAINT `awards_video_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Contraintes pour la table `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `fk_bookings_event` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `contributor`
--
ALTER TABLE `contributor`
  ADD CONSTRAINT `fk_contributor_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `film_tag`
--
ALTER TABLE `film_tag`
  ADD CONSTRAINT `film_tag_ibfk_1` FOREIGN KEY (`tag_id`) REFERENCES `tag` (`id`),
  ADD CONSTRAINT `film_tag_ibfk_2` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`);

--
-- Contraintes pour la table `newsletter_deliveries`
--
ALTER TABLE `newsletter_deliveries`
  ADD CONSTRAINT `fk_delivery_newsletter` FOREIGN KEY (`newsletter_id`) REFERENCES `newsletters` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `social_media`
--
ALTER TABLE `social_media`
  ADD CONSTRAINT `social_media_ibfk_1` FOREIGN KEY (`id`) REFERENCES `videos` (`id`);

--
-- Contraintes pour la table `still`
--
ALTER TABLE `still`
  ADD CONSTRAINT `fk_still_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`id`) REFERENCES `faq` (`id`);

--
-- Contraintes pour la table `video_subtitles`
--
ALTER TABLE `video_subtitles`
  ADD CONSTRAINT `fk_video_subtitles_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `video_tag`
--
ALTER TABLE `video_tag`
  ADD CONSTRAINT `fk_video_tag_tag` FOREIGN KEY (`tag_id`) REFERENCES `tags` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_video_tag_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
