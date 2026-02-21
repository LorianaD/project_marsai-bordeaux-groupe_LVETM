-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Généré le : ven. 20 fév. 2026 à 16:34
-- Version du serveur : 8.0.40
-- Version de PHP : 8.3.14

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
  `score` decimal(4,2) DEFAULT NULL,
  `video_id` int NOT NULL,
  `admin_user_id` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
  `section` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'global',
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
(3, 'home', 'hero', 'protocol', 'fr', 'text', 'le protocole temporel 2026', 0, 1, '2026-02-05 16:28:47', '2026-02-18 15:23:05'),
(4, 'home', 'hero', 'tagline_before', 'fr', 'text', 'Imaginez des', 5, 1, '2026-02-05 16:28:47', '2026-02-18 15:23:05'),
(5, 'home', 'hero', 'tagline_highlight', 'fr', 'text', 'Futurs', 6, 1, '2026-02-05 16:28:47', '2026-02-18 15:23:05'),
(6, 'home', 'hero', 'tagline_after', 'fr', 'text', 'souhaitables', 7, 1, '2026-02-05 16:28:47', '2026-02-18 15:23:05'),
(7, 'home', 'hero', 'desc1', 'fr', 'text', 'Le festival de courts-métrages de 60 secondes réalisés par IA.', 8, 1, '2026-02-05 16:28:47', '2026-02-18 15:23:05'),
(8, 'home', 'hero', 'desc2', 'fr', 'text', '2 jours d\'immersion au cœur de Marseille.', 9, 1, '2026-02-05 16:28:47', '2026-02-18 15:23:05'),
(9, 'home', 'hero', 'ctaParticipate', 'fr', 'text', 'Participer', 10, 1, '2026-02-05 16:28:47', '2026-02-18 15:23:05'),
(10, 'home', 'hero', 'ctaLearnMore', 'fr', 'text', 'En savoir plus', 13, 1, '2026-02-05 16:28:47', '2026-02-18 15:23:05'),
(11, 'home', 'hero', 'protocol', 'en', 'text', 'the 2026 temporal protocol', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(12, 'home', 'hero', 'tagline_before', 'en', 'text', 'Imagine', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(13, 'home', 'hero', 'tagline_highlight', 'en', 'text', 'Futures', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(14, 'home', 'hero', 'tagline_after', 'en', 'text', 'worth imagining', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(15, 'home', 'hero', 'desc1', 'en', 'text', 'the 60-second short film festival', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(16, 'home', 'hero', 'desc2', 'en', 'text', '2 days of immersion in the heart of Marseille.', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(17, 'home', 'hero', 'ctaParticipate', 'en', 'text', 'Participate', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(18, 'home', 'hero', 'ctaLearnMore', 'en', 'text', 'Learn more', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(19, 'home', 'hero', 'title_main', 'fr', 'text', 'mars', 3, 1, '2026-02-05 16:32:23', '2026-02-18 15:23:05'),
(20, 'home', 'hero', 'title_accent', 'fr', 'text', 'ai', 4, 1, '2026-02-05 16:32:23', '2026-02-18 15:23:05'),
(21, 'home', 'hero', 'title_main', 'en', 'text', 'MARS', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(22, 'home', 'hero', 'title_accent', 'en', 'text', 'AI', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(23, 'home', 'hero', 'ctaLearnMore_signe', 'fr', 'image', '/uploads/icons/1771422876669-icons8-plus-96.png', 14, 1, '2026-02-06 09:54:31', '2026-02-18 14:54:36'),
(25, 'home', 'hero', 'ctaParticipate_signe', 'fr', 'image', '/uploads/icons/1771422952133-arrowRight.svg', 11, 1, '2026-02-09 10:41:35', '2026-02-18 14:55:52'),
(27, 'home', 'hero', 'protocol_icon', 'fr', 'image', '/uploads/icons/1771423093750-IconStars.svg', 1, 1, '2026-02-10 11:59:41', '2026-02-18 14:58:13'),
(33, 'home', 'concept', 'title_main', 'fr', 'text', 'Concept du festival MARSAI', 1, 0, '2026-02-10 14:11:53', '2026-02-20 13:29:31'),
(34, 'home', 'concept', 'card1_title', 'fr', 'text', '1 minute', 2, 1, '2026-02-10 14:11:53', '2026-02-20 13:29:31'),
(35, 'home', 'concept', 'card1_description', 'fr', 'text', 'Format ultra-court pour un impact maximum.', 3, 1, '2026-02-10 14:11:53', '2026-02-20 13:29:31'),
(36, 'home', 'concept', 'card2_title', 'fr', 'text', 'Gratuité', 5, 1, '2026-02-10 14:11:53', '2026-02-20 13:29:31'),
(37, 'home', 'concept', 'card2_description', 'fr', 'text', 'Conférences et workshops accessibles.', 6, 1, '2026-02-10 14:11:53', '2026-02-20 13:29:31'),
(38, 'home', 'concept', 'card3_title', 'fr', 'text', 'Pour tous', 8, 1, '2026-02-10 14:11:53', '2026-02-20 13:29:31'),
(39, 'home', 'concept', 'card3_description', 'fr', 'text', 'Professionnels, étudiants et curieux.', 9, 1, '2026-02-10 14:11:53', '2026-02-20 13:29:31'),
(40, 'home', 'concept', 'card4_title', 'fr', 'text', 'Expertise', 11, 1, '2026-02-10 14:11:53', '2026-02-20 13:29:32'),
(41, 'home', 'concept', 'card4_description', 'fr', 'text', 'Leaders mondiaux de l’IA générative.', 12, 1, '2026-02-10 14:11:53', '2026-02-20 13:29:32'),
(42, 'home', 'concept', 'title_main', 'en', 'text', 'MARSAI Festival Concept', 0, 0, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(43, 'home', 'concept', 'card1_title', 'en', 'text', '1 minute', 1, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(44, 'home', 'concept', 'card1_description', 'en', 'text', 'Ultra-short format for maximum impact.', 2, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(45, 'home', 'concept', 'card2_title', 'en', 'text', 'Free access', 3, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(46, 'home', 'concept', 'card2_description', 'en', 'text', 'Talks and workshops are accessible.', 4, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(47, 'home', 'concept', 'card3_title', 'en', 'text', 'For everyone', 5, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(48, 'home', 'concept', 'card3_description', 'en', 'text', 'Professionals, students, and curious minds.', 6, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(49, 'home', 'concept', 'card4_title', 'en', 'text', 'Expertise', 7, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(50, 'home', 'concept', 'card4_description', 'en', 'text', 'World leaders in generative AI.', 8, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(51, 'home', 'award', 'eyebrow', 'en', 'text', 'The MARS.AI Project', 1, 1, '2026-02-12 10:34:02', '2026-02-20 15:05:35'),
(52, 'home', 'award', 'title1', 'en', 'text', 'Films in', 3, 1, '2026-02-12 10:34:02', '2026-02-20 15:05:35'),
(53, 'home', 'award', 'title2', 'en', 'text', 'Competition', 4, 1, '2026-02-12 10:34:02', '2026-02-20 15:05:35'),
(54, 'home', 'award', 'description', 'en', 'text', 'Discover a selection of pioneering works exploring new frontiers of AI-assisted imagination.', 5, 1, '2026-02-12 10:34:02', '2026-02-20 15:05:35'),
(55, 'home', 'award', 'ctaSeeMore', 'en', 'text', 'View the selection', 6, 1, '2026-02-12 10:34:02', '2026-02-20 15:05:35'),
(56, 'home', 'award', 'eyebrow', 'fr', 'text', 'le projet MARS.A.I.', 1, 1, '2026-02-12 10:34:16', '2026-02-20 15:05:35'),
(57, 'home', 'award', 'title1', 'fr', 'text', 'Films en', 3, 1, '2026-02-12 10:34:16', '2026-02-20 15:05:35'),
(58, 'home', 'award', 'title2', 'fr', 'text', 'Compétition', 4, 1, '2026-02-12 10:34:16', '2026-02-20 15:05:35'),
(59, 'home', 'award', 'description', 'fr', 'text', 'Découvrez une sélection d’œuvres pionnières explorant de nouvelles frontières de l’imaginaire assisté par IA.', 5, 1, '2026-02-12 10:34:16', '2026-02-20 15:05:35'),
(60, 'home', 'award', 'ctaSeeMore', 'fr', 'text', 'Voir la sélection', 6, 1, '2026-02-12 10:34:16', '2026-02-20 15:05:35'),
(61, 'home', 'award', 'ctaSeeMore_link', 'fr', 'text', '/gallery', 7, 1, '2026-02-12 11:31:57', '2026-02-20 15:05:35'),
(63, 'home', 'goal', 'title_main', 'fr', 'text', 'Objectifs du', 0, 1, '2026-02-12 13:30:45', '2026-02-12 14:40:12'),
(64, 'home', 'goal', 'title_accent', 'fr', 'text', 'festival', 1, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(65, 'home', 'goal', 'card1_title', 'fr', 'text', 'L\'humain au centre', 2, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(66, 'home', 'goal', 'card1_description', 'fr', 'text', 'Mettre l\'humain au coeur de la création pour ne pas perdre l\'émotion.', 3, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(67, 'home', 'goal', 'card1_icon', 'fr', 'image', '/uploads/icons/1771329374426-IconTarget.svg', 4, 1, '2026-02-12 13:30:45', '2026-02-17 12:56:14'),
(68, 'home', 'goal', 'card2_title', 'fr', 'text', 'Challenge créatif', 5, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(69, 'home', 'goal', 'card2_description', 'fr', 'text', 'Challenger la créativité grâce à un format ultra court de 60s.', 6, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(70, 'home', 'goal', 'card2_icon', 'fr', 'image', '/uploads/icons/1771329374443-IconLightning.svg', 7, 1, '2026-02-12 13:30:45', '2026-02-17 12:56:14'),
(71, 'home', 'goal', 'card3_title', 'fr', 'text', 'Futurs souhaitables', 8, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(72, 'home', 'goal', 'card3_description', 'fr', 'text', 'Explorer les futurs désirables via les technologies émergentes.', 9, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(73, 'home', 'goal', 'card3_icon', 'fr', 'image', '/uploads/icons/1770901742995-IconRocket.svg', 10, 1, '2026-02-12 13:30:45', '2026-02-12 14:09:02'),
(74, 'home', 'goal', 'title_main', 'en', 'text', 'Goals of the', 0, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(75, 'home', 'goal', 'title_accent', 'en', 'text', 'festival', 1, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(76, 'home', 'goal', 'card1_title', 'en', 'text', 'People first', 2, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(77, 'home', 'goal', 'card1_description', 'en', 'text', 'Putting humans at the heart of creation so emotion is never lost.', 3, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(79, 'home', 'goal', 'card2_title', 'en', 'text', 'Creative challenge', 5, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(80, 'home', 'goal', 'card2_description', 'en', 'text', 'Challenge creativity with an ultra-short 60s format.', 6, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(82, 'home', 'goal', 'card3_title', 'en', 'text', 'Desirable futures', 8, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(83, 'home', 'goal', 'card3_description', 'en', 'text', 'Explore desirable futures through emerging technologies.', 9, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(85, 'home', 'concept', 'card1_title_color', 'fr', 'text', '#C27AFF', 4, 1, '2026-02-13 10:14:41', '2026-02-20 13:29:31'),
(86, 'home', 'concept', 'card2_title_color', 'fr', 'text', '#5257ff', 7, 1, '2026-02-13 10:14:41', '2026-02-20 13:29:31'),
(87, 'home', 'concept', 'card3_title_color', 'fr', 'text', '#FB64B6', 10, 1, '2026-02-13 10:14:41', '2026-02-20 13:29:31'),
(88, 'home', 'concept', 'card4_title_color', 'fr', 'text', '#2B7FFF', 13, 1, '2026-02-13 10:14:41', '2026-02-20 13:29:32'),
(89, 'home', 'concept', 'card1_title_color', 'en', 'text', '#A855F7', 100, 1, '2026-02-13 10:14:41', '2026-02-13 11:13:52'),
(90, 'home', 'concept', 'card2_title_color', 'en', 'text', '#10B981', 101, 1, '2026-02-13 10:14:41', '2026-02-13 11:13:52'),
(91, 'home', 'concept', 'card3_title_color', 'en', 'text', '#EC4899', 102, 1, '2026-02-13 10:14:41', '2026-02-13 11:13:52'),
(92, 'home', 'concept', 'card4_title_color', 'en', 'text', '#3B82F6', 103, 1, '2026-02-13 10:14:41', '2026-02-13 11:13:52'),
(93, 'home', 'hero', 'media', 'fr', 'image', '/uploads/medias/1771424585370-787849940.mp4', 2, 1, '2026-02-13 14:11:45', '2026-02-18 15:23:05'),
(95, 'home', 'hero', 'ctaLearnMore_link', 'fr', 'text', '/learnMore', 15, 1, '2026-02-15 17:12:57', '2026-02-18 15:23:05'),
(97, 'home', 'hero', 'ctaParticipate_link', 'fr', 'text', '/participatioN', 12, 1, '2026-02-15 17:15:38', '2026-02-18 15:23:05'),
(99, 'home', 'events', 'title_main', 'fr', 'text', 'Deux journées de', 0, 1, '2026-02-16 10:19:58', '2026-02-17 15:49:51'),
(100, 'home', 'events', 'title_main_color', 'fr', 'text', '#000000', 1, 1, '2026-02-16 10:19:58', '2026-02-17 15:50:16'),
(101, 'home', 'events', 'title_accent', 'fr', 'text', 'Conférences gratuites', 2, 1, '2026-02-16 10:19:58', '2026-02-17 15:49:51'),
(102, 'home', 'events', 'title_accent_color', 'fr', 'text', '#AD46FF', 3, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(103, 'home', 'events', 'list_item1', 'fr', 'text', 'Débats engagés sur l’éthique et le futur', 0, 1, '2026-02-16 10:19:58', '2026-02-17 11:31:05'),
(104, 'home', 'events', 'list_item2', 'fr', 'text', 'Confrontations d\'idées entre artistes et tech', 5, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(105, 'home', 'events', 'list_item3', 'fr', 'text', 'Interrogations stimulantes sur la création', 6, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(106, 'home', 'events', 'ctaAgenda', 'fr', 'text', 'Agenda Complet', 7, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(107, 'home', 'events', 'ctaAgenda_link', 'fr', 'text', '/events', 8, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(108, 'home', 'events', 'ctaAgenda_icon', 'fr', 'text', '/uploads/icons/1771324353757-IconCalendar.svg', 9, 1, '2026-02-16 10:19:58', '2026-02-17 11:32:33'),
(109, 'home', 'events', 'card1_icon', 'fr', 'text', '/uploads/icons/1771325049418-IconPlay.svg', 10, 1, '2026-02-16 10:19:58', '2026-02-17 11:44:09'),
(110, 'home', 'events', 'card1_title', 'fr', 'text', 'Projections', 0, 1, '2026-02-16 10:19:58', '2026-02-17 13:26:52'),
(111, 'home', 'events', 'card1_title_color', 'fr', 'text', '#000000', 12, 1, '2026-02-16 10:19:58', '2026-02-17 15:50:58'),
(112, 'home', 'events', 'card1_description', 'fr', 'text', 'Diffusion sur écran géant en présence des réalisateurs.', 13, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(113, 'home', 'events', 'card1_link', 'fr', 'text', '/events', 14, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(114, 'home', 'events', 'card2_icon', 'fr', 'text', '/uploads/icons/1771325049455-IconPeople.svg', 15, 1, '2026-02-16 10:19:58', '2026-02-17 11:44:09'),
(115, 'home', 'events', 'card2_title', 'fr', 'text', 'Workshops', 0, 1, '2026-02-16 10:19:58', '2026-02-17 13:26:54'),
(116, 'home', 'events', 'card2_title_color', 'fr', 'text', '#000000', 17, 1, '2026-02-16 10:19:58', '2026-02-17 15:50:58'),
(117, 'home', 'events', 'card2_description', 'fr', 'text', 'Sessions pratiques pour maîtriser les outils IA.', 18, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(118, 'home', 'events', 'card2_link', 'fr', 'text', '/events', 19, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(119, 'home', 'events', 'card3_icon', 'fr', 'text', '/uploads/icons/1771325049466-IconAward.svg', 20, 1, '2026-02-16 10:19:58', '2026-02-17 11:44:09'),
(120, 'home', 'events', 'card3_title', 'fr', 'text', 'Awards', 0, 1, '2026-02-16 10:19:58', '2026-02-17 13:26:56'),
(121, 'home', 'events', 'card3_title_color', 'fr', 'text', '#000000', 22, 1, '2026-02-16 10:19:58', '2026-02-17 15:50:58'),
(122, 'home', 'events', 'card3_description', 'fr', 'text', 'Cérémonie de clôture récompensant l\'audace.', 23, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(123, 'home', 'events', 'card3_link', 'fr', 'text', '/events', 24, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(124, 'home', 'events', 'title_main', 'en', 'text', 'Two days of', 0, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(125, 'home', 'events', 'title_main_color', 'en', 'text', '', 1, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(126, 'home', 'events', 'title_accent', 'en', 'text', 'Free conferences', 2, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(127, 'home', 'events', 'title_accent_color', 'en', 'text', '#AD46FF', 3, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(128, 'home', 'events', 'list_item1', 'en', 'text', 'Engaging debates on ethics and the future', 4, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(129, 'home', 'events', 'list_item2', 'en', 'text', 'Thought-provoking exchanges between artists and tech', 5, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(130, 'home', 'events', 'list_item3', 'en', 'text', 'Stimulating questions about creation', 6, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(131, 'home', 'events', 'ctaAgenda', 'en', 'text', 'Full agenda', 7, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(132, 'home', 'events', 'ctaAgenda_link', 'en', 'text', '/events', 8, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(133, 'home', 'events', 'ctaAgenda_icon', 'en', 'text', '../../assets/imgs/icones/IconCalendar.svg', 9, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(134, 'home', 'events', 'card1_icon', 'en', 'text', '/uploads/icons/1771330685638-IconPlay.svg', 10, 1, '2026-02-16 10:21:23', '2026-02-17 13:18:05'),
(135, 'home', 'events', 'card1_title', 'en', 'text', 'Screenings', 11, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(136, 'home', 'events', 'card1_title_color', 'en', 'text', '', 12, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(137, 'home', 'events', 'card1_description', 'en', 'text', 'Big-screen screenings with the filmmakers present.', 13, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(138, 'home', 'events', 'card1_link', 'en', 'text', '/events', 14, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(139, 'home', 'events', 'card2_icon', 'en', 'text', '/uploads/icons/1771330685671-IconPeople.svg', 15, 1, '2026-02-16 10:21:23', '2026-02-17 13:18:05'),
(140, 'home', 'events', 'card2_title', 'en', 'text', 'Workshops', 16, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(141, 'home', 'events', 'card2_title_color', 'en', 'text', '', 17, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(142, 'home', 'events', 'card2_description', 'en', 'text', 'Hands-on sessions to master AI tools.', 18, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(143, 'home', 'events', 'card2_link', 'en', 'text', '/events', 19, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(144, 'home', 'events', 'card3_icon', 'en', 'text', '/uploads/icons/1771330685681-IconAward.svg', 20, 1, '2026-02-16 10:21:23', '2026-02-17 13:18:05'),
(145, 'home', 'events', 'card3_title', 'en', 'text', 'Awards', 21, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(146, 'home', 'events', 'card3_title_color', 'en', 'text', '', 22, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(147, 'home', 'events', 'card3_description', 'en', 'text', 'A closing ceremony celebrating bold creativity.', 23, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(148, 'home', 'events', 'card3_link', 'en', 'text', '/events', 24, 1, '2026-02-16 10:21:23', '2026-02-16 10:21:23'),
(149, 'home', 'closingEvent', 'eyebrow', 'fr', 'text', 'Soirée de Clôture', 0, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(150, 'home', 'closingEvent', 'eyebrow_text_color', 'fr', 'text', '#C27AFF', 1, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(151, 'home', 'closingEvent', 'eyebrow_bg_color', 'fr', 'text', 'rgba(173, 70, 255, 0.2)', 2, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(152, 'home', 'closingEvent', 'title_main', 'fr', 'text', 'MARS.A.I', 3, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(153, 'home', 'closingEvent', 'title_main_color', 'fr', 'text', '', 4, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(154, 'home', 'closingEvent', 'title_accent', 'fr', 'text', 'NIGHT', 5, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(155, 'home', 'closingEvent', 'title_accent_color', 'fr', 'text', '#F6339A', 6, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(156, 'home', 'closingEvent', 'description_ligne1', 'fr', 'text', 'Fête Électro mêlant IA et futurs souhaitables.', 7, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(157, 'home', 'closingEvent', 'description_ligne2', 'fr', 'text', 'Une expérience immersive sonore et visuelle.', 8, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(158, 'home', 'closingEvent', 'card_icon', 'fr', 'text', '/src/assets/imgs/icones/iconClock.svg', 9, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(159, 'home', 'closingEvent', 'card_date', 'fr', 'text', '13 JUIN', 10, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(160, 'home', 'closingEvent', 'card_hour', 'fr', 'text', 'DÈS 19H00', 11, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(161, 'home', 'closingEvent', 'card_localisation', 'fr', 'text', 'MARSEILLE', 12, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(162, 'home', 'closingEvent', 'card_ctaBooking', 'fr', 'text', 'Réserver', 13, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(163, 'home', 'closingEvent', 'card_ctaBooking_link', 'fr', 'text', '/events', 14, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(164, 'home', 'closingEvent', 'eyebrow', 'en', 'text', 'Closing Night', 0, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(165, 'home', 'closingEvent', 'eyebrow_text_color', 'en', 'text', '#C27AFF', 1, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(166, 'home', 'closingEvent', 'eyebrow_bg_color', 'en', 'text', 'rgba(173, 70, 255, 0.2)', 2, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(167, 'home', 'closingEvent', 'title_main', 'en', 'text', 'MARS.A.I', 3, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(168, 'home', 'closingEvent', 'title_main_color', 'en', 'text', '', 4, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(169, 'home', 'closingEvent', 'title_accent', 'en', 'text', 'NIGHT', 5, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(170, 'home', 'closingEvent', 'title_accent_color', 'en', 'text', '#F6339A', 6, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(171, 'home', 'closingEvent', 'description_ligne1', 'en', 'text', 'An electro party blending AI and desirable futures.', 7, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(172, 'home', 'closingEvent', 'description_ligne2', 'en', 'text', 'An immersive sound and visual experience.', 8, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(173, 'home', 'closingEvent', 'card_icon', 'en', 'text', '/src/assets/imgs/icones/iconClock.svg', 9, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(174, 'home', 'closingEvent', 'card_date', 'en', 'text', 'JUNE 13', 10, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(175, 'home', 'closingEvent', 'card_hour', 'en', 'text', 'FROM 7:00 PM', 11, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(176, 'home', 'closingEvent', 'card_localisation', 'en', 'text', 'MARSEILLE', 12, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(177, 'home', 'closingEvent', 'card_ctaBooking', 'en', 'text', 'Book now', 13, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(178, 'home', 'closingEvent', 'card_ctaBooking_link', 'en', 'text', '/events', 14, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(179, 'home', 'localisationEvent', 'eyebrow', 'fr', 'text', 'Le lieu', 0, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(180, 'home', 'localisationEvent', 'eyebrow_icon', 'fr', 'text', '../../assets/imgs/icones/IconLocalisation.svg', 1, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(181, 'home', 'localisationEvent', 'eyebrow_color', 'fr', 'text', '', 2, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(182, 'home', 'localisationEvent', 'venue_namePart1', 'fr', 'text', 'La', 3, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(183, 'home', 'localisationEvent', 'venue_namePart2', 'fr', 'text', 'Plateforme', 4, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(184, 'home', 'localisationEvent', 'venue_cityTagline', 'fr', 'text', 'Marseille, Hub Créatif', 5, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(185, 'home', 'localisationEvent', 'venue_color', 'fr', 'text', '#51A2FF', 6, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(186, 'home', 'localisationEvent', 'address_street', 'fr', 'text', '12 Rue d\'Uzes', 7, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(187, 'home', 'localisationEvent', 'address_postalCode', 'fr', 'text', '13002', 8, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(188, 'home', 'localisationEvent', 'address_city', 'fr', 'text', 'Marseille', 9, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(189, 'home', 'localisationEvent', 'address_color', 'fr', 'text', '', 10, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(190, 'home', 'localisationEvent', 'access_tram', 'fr', 'text', 'Accès Tram T2/T3 – Arrêt Arenc Le Silo', 11, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(191, 'home', 'localisationEvent', 'access_color', 'fr', 'text', '', 12, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(192, 'home', 'localisationEvent', 'space1_name', 'fr', 'text', 'Salle des Sucres', 13, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(193, 'home', 'localisationEvent', 'space1_description', 'fr', 'text', 'Futur sanctuaire des conférences et de la remise des prix de Mars.A.I. Un espace majestueux alliant patrimoine et technologie.', 14, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(194, 'home', 'localisationEvent', 'space1_color', 'fr', 'text', '#51A2FF', 15, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(195, 'home', 'localisationEvent', 'space2_name', 'fr', 'text', 'Salle PLAZA', 16, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(196, 'home', 'localisationEvent', 'space2_description', 'fr', 'text', 'L\'épicentre du festival : accueil, animations, workshops et restauration. Le point de rencontre de tous les participants.', 17, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(197, 'home', 'localisationEvent', 'space2_color', 'fr', 'text', '#C27AFF', 18, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(198, 'home', 'localisationEvent', 'maps_link', 'fr', 'text', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8044.241161952438!2d5.362378323117001!3d43.314391970182314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c13ddc0211b9%3A0xd1642ae4b32c4bc4!2s%C3%89cole%20La%20Plateforme_%20Marseille%20-%20Entr%C3%A9e%20Sud!5e1!3m2!1sfr!2sfr!4v1769784840463!5m2!1sfr!2sfr', 19, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(199, 'home', 'localisationEvent', 'eyebrow', 'en', 'text', 'The Venue', 0, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(200, 'home', 'localisationEvent', 'eyebrow_icon', 'en', 'text', '../../assets/imgs/icones/IconLocalisation.svg', 1, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(201, 'home', 'localisationEvent', 'eyebrow_color', 'en', 'text', '', 2, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(202, 'home', 'localisationEvent', 'venue_namePart1', 'en', 'text', 'La', 3, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(203, 'home', 'localisationEvent', 'venue_namePart2', 'en', 'text', 'Plateforme', 4, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(204, 'home', 'localisationEvent', 'venue_cityTagline', 'en', 'text', 'Marseille, Creative Hub', 5, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(205, 'home', 'localisationEvent', 'venue_color', 'en', 'text', '#51A2FF', 6, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(206, 'home', 'localisationEvent', 'address_street', 'en', 'text', '12 Rue d\'Uzes', 7, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(207, 'home', 'localisationEvent', 'address_postalCode', 'en', 'text', '13002', 8, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(208, 'home', 'localisationEvent', 'address_city', 'en', 'text', 'Marseille', 9, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(209, 'home', 'localisationEvent', 'address_color', 'en', 'text', '', 10, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(210, 'home', 'localisationEvent', 'access_tram', 'en', 'text', 'Tram access T2/T3 – Arenc Le Silo stop', 11, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(211, 'home', 'localisationEvent', 'access_color', 'en', 'text', '', 12, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(212, 'home', 'localisationEvent', 'space1_name', 'en', 'text', 'Salle des Sucres', 13, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(213, 'home', 'localisationEvent', 'space1_description', 'en', 'text', 'Future sanctuary of conferences and the Mars.A.I awards ceremony. A majestic space blending heritage and technology.', 14, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(214, 'home', 'localisationEvent', 'space1_color', 'en', 'text', '#51A2FF', 15, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(215, 'home', 'localisationEvent', 'space2_name', 'en', 'text', 'PLAZA Hall', 16, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(216, 'home', 'localisationEvent', 'space2_description', 'en', 'text', 'The heart of the festival: welcome area, entertainment, workshops and catering. The meeting point for all participants.', 17, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(217, 'home', 'localisationEvent', 'space2_color', 'en', 'text', '#C27AFF', 18, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(218, 'home', 'localisationEvent', 'maps_link', 'en', 'text', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8044.241161952438!2d5.362378323117001!3d43.314391970182314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c13ddc0211b9%3A0xd1642ae4b32c4bc4!2s%C3%89cole%20La%20Plateforme_%20Marseille%20-%20Entr%C3%A9e%20Sud!5e1!3m2!1sfr!2sfr!4v1769784840463!5m2!1sfr!2sfr', 19, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(219, 'home', 'projectedStats', 'heading_title_main', 'fr', 'text', 'Chiffres', 0, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(220, 'home', 'projectedStats', 'heading_title_main_color', 'fr', 'text', '', 1, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(221, 'home', 'projectedStats', 'heading_title_accent', 'fr', 'text', 'Projetés', 2, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(222, 'home', 'projectedStats', 'heading_title_accent_color', 'fr', 'text', '#F6339A', 3, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(223, 'home', 'projectedStats', 'heading_tagline', 'fr', 'text', 'Échelle mondiale, impact local.', 4, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(224, 'home', 'projectedStats', 'stat1_value', 'fr', 'text', '+120', 5, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(225, 'home', 'projectedStats', 'stat1_label', 'fr', 'text', 'Pays représentés', 6, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(226, 'home', 'projectedStats', 'stat1_label_color', 'fr', 'text', '#AD46FF', 7, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(227, 'home', 'projectedStats', 'stat2_value', 'fr', 'text', '+600', 8, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(228, 'home', 'projectedStats', 'stat2_label', 'fr', 'text', 'Films soumis', 9, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(229, 'home', 'projectedStats', 'stat2_label_color', 'fr', 'text', '#F6339A', 10, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(230, 'home', 'projectedStats', 'heading_title_main', 'en', 'text', 'Projected', 0, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(231, 'home', 'projectedStats', 'heading_title_main_color', 'en', 'text', '', 1, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(232, 'home', 'projectedStats', 'heading_title_accent', 'en', 'text', 'Figures', 2, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(233, 'home', 'projectedStats', 'heading_title_accent_color', 'en', 'text', '#F6339A', 3, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(234, 'home', 'projectedStats', 'heading_tagline', 'en', 'text', 'Global scale, local impact.', 4, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(235, 'home', 'projectedStats', 'stat1_value', 'en', 'text', '+120', 5, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(236, 'home', 'projectedStats', 'stat1_label', 'en', 'text', 'Countries represented', 6, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(237, 'home', 'projectedStats', 'stat1_label_color', 'en', 'text', '#AD46FF', 7, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(238, 'home', 'projectedStats', 'stat2_value', 'en', 'text', '+600', 8, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(239, 'home', 'projectedStats', 'stat2_label', 'en', 'text', 'Films submitted', 9, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(240, 'home', 'projectedStats', 'stat2_label_color', 'en', 'text', '#F6339A', 10, 1, '2026-02-16 11:04:33', '2026-02-16 11:04:33'),
(241, 'home', 'partnersSection', 'eyebrow', 'fr', 'text', 'Nos Soutiens', 0, 1, '2026-02-16 11:10:02', '2026-02-16 11:10:02'),
(242, 'home', 'partnersSection', 'title_main', 'fr', 'text', 'Ils soutiennent ', 1, 1, '2026-02-16 11:10:02', '2026-02-16 11:10:02'),
(243, 'home', 'partnersSection', 'title_accent', 'fr', 'text', 'le futur', 2, 1, '2026-02-16 11:10:02', '2026-02-16 11:10:02'),
(244, 'home', 'partnersSection', 'title_accent_color', 'fr', 'text', '#00D3F2', 3, 1, '2026-02-16 11:10:02', '2026-02-16 11:10:02'),
(245, 'home', 'partnersSection', 'eyebrow', 'en', 'text', 'Our Supporters', 0, 1, '2026-02-16 11:13:24', '2026-02-16 11:13:24'),
(246, 'home', 'partnersSection', 'title_main', 'en', 'text', 'They support ', 1, 1, '2026-02-16 11:13:24', '2026-02-16 11:13:24'),
(247, 'home', 'partnersSection', 'title_accent', 'en', 'text', 'the future', 2, 1, '2026-02-16 11:13:24', '2026-02-16 11:13:24'),
(248, 'home', 'partnersSection', 'title_accent_color', 'en', 'text', '#00D3F2', 3, 1, '2026-02-16 11:13:24', '2026-02-16 11:13:24'),
(249, 'home', 'award', 'eyebrow_color', 'fr', 'text', '#2B7FFF', 2, 1, '2026-02-16 11:28:05', '2026-02-20 15:05:35'),
(250, 'home', 'award', 'ctaSeeMore_color', 'fr', 'text', '#E1BDFF', 8, 1, '2026-02-16 11:28:05', '2026-02-20 16:22:41'),
(255, 'home', 'award', 'eyebrow_color', 'en', 'text', '#2B7FFF', 2, 1, '2026-02-16 11:28:23', '2026-02-20 15:05:35'),
(256, 'home', 'award', 'ctaSeeMore_color', 'en', 'text', 'rgba(194, 122, 255, 0.52)', 8, 1, '2026-02-16 11:28:23', '2026-02-20 15:05:35'),
(273, 'home', 'hero', 'ctaLearnMore_signe', 'en', 'image', '/uploads/icons/1771422876680-icons8-plus-96.png', 14, 1, '2026-02-18 14:52:50', '2026-02-18 14:54:36'),
(301, 'home', 'hero', 'ctaParticipate_signe', 'en', 'image', '/uploads/icons/1771422952146-arrowRight.svg', 11, 1, '2026-02-18 14:55:50', '2026-02-18 14:55:52'),
(321, 'home', 'hero', 'protocol_icon', 'en', 'image', '/uploads/icons/1771423093762-IconStars.svg', 1, 1, '2026-02-18 14:58:13', '2026-02-18 14:58:13'),
(335, 'home', 'hero', 'media', 'en', 'image', '/uploads/medias/1771424585412-187496368.mp4', 2, 1, '2026-02-18 15:16:45', '2026-02-18 15:23:05'),
(359, 'home', 'hero', 'ctaParticipate_link', 'en', 'text', '/participatioN', 12, 1, '2026-02-18 15:23:05', '2026-02-18 15:23:05'),
(362, 'home', 'hero', 'ctaLearnMore_link', 'en', 'text', '/learnMore', 15, 1, '2026-02-18 15:23:05', '2026-02-18 15:23:05'),
(363, 'home', 'header', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-02-19 08:56:35', '2026-02-19 08:56:35'),
(364, 'home', 'header', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-02-19 08:56:35', '2026-02-19 08:56:35'),
(365, 'home', 'hero', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-02-19 09:40:23', '2026-02-20 10:17:23'),
(366, 'home', 'hero', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-02-19 09:40:23', '2026-02-19 09:40:23'),
(371, 'layout', 'header', 'logo', 'fr', 'image', '/uploads/medias/1771511243648-300954571.png', 0, 1, '2026-02-19 11:55:50', '2026-02-19 15:27:23'),
(372, 'layout', 'header', 'home', 'fr', 'text', 'Accueil', 1, 1, '2026-02-19 11:55:50', '2026-02-19 15:27:23'),
(373, 'layout', 'header', 'home_link', 'fr', 'text', '/', 2, 1, '2026-02-19 11:55:50', '2026-02-19 15:27:23'),
(374, 'layout', 'header', 'first', 'fr', 'text', 'Galerie', 0, 1, '2026-02-19 11:55:50', '2026-02-19 16:36:04'),
(375, 'layout', 'header', 'first_link', 'fr', 'text', '/gallery', 4, 1, '2026-02-19 11:55:50', '2026-02-19 15:27:23'),
(376, 'layout', 'header', 'seconde', 'fr', 'text', 'Programme & infos', 0, 1, '2026-02-19 11:55:50', '2026-02-19 16:36:04'),
(377, 'layout', 'header', 'seconde_link', 'fr', 'text', '/events', 6, 1, '2026-02-19 11:55:50', '2026-02-19 15:27:24'),
(378, 'layout', 'header', 'third', 'fr', 'text', 'Jury', 0, 1, '2026-02-19 11:55:50', '2026-02-19 16:36:05'),
(379, 'layout', 'header', 'third_link', 'fr', 'text', '/jury', 8, 1, '2026-02-19 11:55:50', '2026-02-19 15:27:24'),
(380, 'layout', 'header', 'btn', 'fr', 'text', 'Participer', 0, 1, '2026-02-19 11:55:50', '2026-02-19 16:42:40'),
(381, 'layout', 'header', 'btn_link', 'fr', 'text', '/participation', 10, 1, '2026-02-19 11:55:50', '2026-02-19 15:27:24'),
(382, 'layout', 'header', 'icon_country', 'fr', 'image', '', 0, 1, '2026-02-19 11:55:50', '2026-02-19 16:49:10'),
(384, 'layout', 'header', 'home', 'en', 'text', 'Home', 1, 1, '2026-02-19 11:56:07', '2026-02-19 11:56:07'),
(385, 'layout', 'header', 'home_link', 'en', 'text', '/', 2, 1, '2026-02-19 11:56:07', '2026-02-19 15:27:23'),
(386, 'layout', 'header', 'first', 'en', 'text', 'Gallery', 3, 1, '2026-02-19 11:56:07', '2026-02-19 11:56:07'),
(387, 'layout', 'header', 'first_link', 'en', 'text', '/gallery', 4, 1, '2026-02-19 11:56:07', '2026-02-19 15:27:23'),
(388, 'layout', 'header', 'seconde', 'en', 'text', 'Program & Info', 5, 1, '2026-02-19 11:56:07', '2026-02-19 11:56:07'),
(389, 'layout', 'header', 'seconde_link', 'en', 'text', '/events', 6, 1, '2026-02-19 11:56:07', '2026-02-19 15:27:24'),
(390, 'layout', 'header', 'third', 'en', 'text', 'Jury', 7, 1, '2026-02-19 11:56:07', '2026-02-19 11:56:07'),
(391, 'layout', 'header', 'third_link', 'en', 'text', '/jury', 8, 1, '2026-02-19 11:56:07', '2026-02-19 15:27:24'),
(392, 'layout', 'header', 'btn', 'en', 'text', 'Participate', 9, 1, '2026-02-19 11:56:07', '2026-02-19 11:56:07'),
(393, 'layout', 'header', 'btn_link', 'en', 'text', '/participation', 10, 1, '2026-02-19 11:56:07', '2026-02-19 15:27:24'),
(396, 'layout', 'header', 'logo', 'en', 'image', '/uploads/medias/1771511243703-79202520.png', 0, 1, '2026-02-19 13:54:54', '2026-02-19 15:27:23'),
(481, 'home', 'concept', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-02-20 11:50:44', '2026-02-20 13:29:31'),
(482, 'home', 'concept', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-02-20 11:50:44', '2026-02-20 11:50:44'),
(499, 'home', 'award', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-02-20 15:02:49', '2026-02-20 17:18:32'),
(500, 'home', 'award', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-02-20 15:02:49', '2026-02-20 15:05:35'),
(501, 'home', 'award', 'ctaSeeMore_link', 'en', 'text', '/gallery', 7, 1, '2026-02-20 15:27:48', '2026-02-20 15:27:48');

-- --------------------------------------------------------

--
-- Structure de la table `conference_program`
--

CREATE TABLE `conference_program` (
  `id` int NOT NULL,
  `time` varchar(10) NOT NULL COMMENT 'Heure affichée (ex. 09:30)',
  `title` varchar(255) NOT NULL,
  `speaker` varchar(255) DEFAULT NULL COMMENT 'Intervenant(s) ou NULL',
  `color` varchar(50) DEFAULT NULL COMMENT 'Classe couleur front (ex. bg-sky-400)',
  `sort_order` int NOT NULL DEFAULT '0',
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `conference_program`
--

INSERT INTO `conference_program` (`id`, `time`, `title`, `speaker`, `color`, `sort_order`, `created_at`, `updated_at`) VALUES
(1, '09:30', 'Accueil & Café Networking', NULL, 'bg-emerald-400', 1, '2026-02-16 15:26:30', '2026-02-16 15:26:30'),
(2, '10:30', 'Conférence d\'ouverture : L\'IA au service du Cinéma', 'Par : Jean-Luc Godart', 'bg-sky-400', 2, '2026-02-16 15:26:30', '2026-02-16 15:26:30'),
(3, '13:00', 'Déjeuner Libre', NULL, 'bg-emerald-400', 3, '2026-02-16 15:26:30', '2026-02-16 15:26:30'),
(4, '14:30', 'Projection Débat/IA Difficile', 'Par : Wim Wenders, Paul Verhoeven', 'bg-sky-400', 4, '2026-02-16 15:26:30', '2026-02-16 15:26:30'),
(5, '16:30', 'Table Ronde : Futurs Distopiales', NULL, 'bg-emerald-400', 5, '2026-02-16 15:26:30', '2026-02-16 15:26:30'),
(6, '20:30', 'Grand Prix IA Créative de l\'EDI', NULL, 'bg-sky-400', 6, '2026-02-16 15:26:30', '2026-02-16 15:26:30'),
(7, '21:30', 'Soirée DJ & VJ : DJ Samantha', NULL, 'bg-emerald-400', 7, '2026-02-16 15:26:30', '2026-02-16 15:26:30');

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
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `read_at` datetime DEFAULT NULL,
  `admin_reply` text,
  `replied_at` datetime DEFAULT NULL,
  `replied_by` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `last_name`, `subject`, `email`, `message`, `created_at`, `is_read`, `read_at`, `admin_reply`, `replied_at`, `replied_by`) VALUES
(1, 'Ocean', 'Breeze', 'Test formulaire', 'ocean@test.com', 'Ceci est un message de test', '2026-02-04 11:27:48', 0, NULL, NULL, NULL, NULL),
(2, 'Biamonti', 'Vanessa', 'why oh why?', 'vanessa.biamonti@gmail.com', 'Hello ya! How are ya ?', '2026-02-04 13:15:19', 0, NULL, NULL, NULL, NULL);

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
  `question_fr` varchar(500) NOT NULL,
  `answer_fr` varchar(500) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change',
  `rank` int DEFAULT '0',
  `question_en` varchar(500) NOT NULL DEFAULT '',
  `answer_en` varchar(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `faq`
--

INSERT INTO `faq` (`id`, `question_fr`, `answer_fr`, `created_at`, `updated_at`, `rank`, `question_en`, `answer_en`) VALUES
(3, 'Quels sont les modes de paiement ?', 'Nous acceptons les cartes bancaires Visa, MasterCard et les paiements via PayPal.', '2026-02-06 13:46:06', '2026-02-06 13:46:06', 4, 'What payment methods are accepted?', 'We accept Visa and MasterCard credit cards, as well as payments via PayPal.'),
(5, 'Comment créer un compte ?', 'Pour créer un compte, cliquez sur le bouton \"S\'inscrire\" en haut à droite et remplissez le formulaire.', '2026-02-11 09:31:16', '2026-02-11 09:31:16', 1, 'How do I create an account?', 'To create an account, click the \"Sign Up\" button at the top right and fill out the form.'),
(6, 'Puis-je modifier mes informations personnelles ?', 'Oui, vous pouvez modifier vos informations personnelles depuis votre espace client dans la section \"Mon profil\".', '2026-02-11 09:31:16', '2026-02-11 09:31:16', 3, 'Can I update my personal information?', 'Yes, you can update your personal information from your account dashboard under the \"My Profile\" section.'),
(8, 'Quels sont les modes de paiement acceptés ?', 'Nous acceptons les cartes bancaires Visa, MasterCard et les paiements via PayPal.', '2026-02-12 13:34:29', '2026-02-12 13:34:29', 1, 'What payment methods are accepted?', 'We accept Visa and MasterCard credit cards, as well as payments via PayPal.'),
(12, 'test1', 'test1', '2026-02-13 13:27:04', '2026-02-13 13:27:04', 1, 'test1', 'test1'),
(13, 'test2', 'test2', '2026-02-13 13:28:50', '2026-02-13 13:28:50', 1, 'test2', 'test2test');

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
  `content_html` mediumtext,
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

INSERT INTO `newsletters` (`id`, `subject`, `title`, `content_json`, `content_html`, `background_color`, `status`, `scheduled_at`, `sent_at`, `created_at`, `updated_at`) VALUES
(1, 'MarsAI — Newsletter #1', 'Bienvenue', '{\"blocks\": [{\"text\": \"Hello MarsAI\", \"type\": \"h1\"}, {\"text\": \"Ceci est un test de newsletter.\", \"type\": \"p\"}, {\"type\": \"divider\"}]}', NULL, '#ffffff', 'sent', NULL, '2026-02-10 14:02:45', '2026-02-10 12:04:10', '2026-02-10 14:02:45'),
(1, 'MarsAI — Newsletter #1', 'Bienvenue', '{\"blocks\": [{\"text\": \"Hello MarsAI\", \"type\": \"h1\"}, {\"text\": \"Ceci est un test de newsletter.\", \"type\": \"p\"}, {\"type\": \"divider\"}]}', NULL, '#ffffff', 'sent', NULL, '2026-02-10 14:02:45', '2026-02-10 12:04:10', '2026-02-10 14:02:45'),
(1, 'MarsAI — Newsletter #1', 'Bienvenue', '{\"blocks\": [{\"text\": \"Hello MarsAI\", \"type\": \"h1\"}, {\"text\": \"Ceci est un test de newsletter.\", \"type\": \"p\"}, {\"type\": \"divider\"}]}', NULL, '#ffffff', 'sent', NULL, '2026-02-10 14:02:45', '2026-02-10 12:04:10', '2026-02-10 14:02:45'),
(1, 'MarsAI — Newsletter #1', 'Bienvenue c\'est Vaness qui l\'a fait toute seule !', '{\"blocks\": [{\"text\": \"Salut la compagnie!\", \"type\": \"h1\"}, {\"type\": \"divider\"}, {\"text\": \"Ceci est un test de newsletter. et je voulais savoir si ça marche \", \"type\": \"p\"}, {\"alt\": \"\", \"url\": \"http://localhost:3000/uploads/newsletters/1770739056050-242682755.png\", \"type\": \"image\"}]}', NULL, '#9d4391', 'sent', NULL, '2026-02-10 16:57:44', '2026-02-10 12:04:10', '2026-02-10 16:57:44'),
(2, 'MarsAI Newsletter2', 'Hello le monde!', '{\"blocks\": []}', NULL, '#6f2f2f', 'draft', NULL, NULL, '2026-02-13 10:31:24', '2026-02-13 10:31:24');

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
(2, 1, 3, 'moi@example.com', 'failed', 'Data command failed: 550 5.7.0 Too many emails per second. Please upgrade your plan https://mailtrap.io/billing/plans/testing', '2026-02-10 14:02:45'),
(1, 1, 2, 'toi@example.com', 'sent', NULL, '2026-02-10 16:57:43'),
(2, 1, 3, 'moi@example.com', 'failed', 'Data command failed: 550 5.7.0 Too many emails per second. Please upgrade your plan https://mailtrap.io/billing/plans/testing', '2026-02-10 16:57:44');

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
(1, 'test123@gmail.com', '2026-02-05 13:33:17', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'toi@example.com', '2026-02-10 08:59:35', NULL, 'active', '2026-02-10 10:59:36', NULL, NULL, '2026-02-10 11:05:12', '0ab5de47b16b20d460ba9a99f86e5672d969e30ef9a4a9bdb0b72186eafcd6ed', NULL),
(3, 'moi@example.com', '2026-02-10 09:05:33', NULL, 'active', '2026-02-10 11:14:22', 'f3856310a1873b7bac740c6d92d54a40a630abe91124acd6800f882e40624800', '2026-02-11 11:14:22', '2026-02-10 11:05:43', 'c751c178fb86aca2b68e0b0c3cf473dfa4fac4d2a9cf21a221781a65a7a112e6', NULL),
(1, 'test123@gmail.com', '2026-02-05 14:33:17', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'toi@example.com', '2026-02-10 09:59:35', NULL, 'active', '2026-02-10 10:59:36', NULL, NULL, '2026-02-10 11:05:12', '0ab5de47b16b20d460ba9a99f86e5672d969e30ef9a4a9bdb0b72186eafcd6ed', NULL),
(3, 'moi@example.com', '2026-02-10 10:05:33', NULL, 'active', '2026-02-10 11:14:22', 'f3856310a1873b7bac740c6d92d54a40a630abe91124acd6800f882e40624800', '2026-02-11 11:14:22', '2026-02-10 11:05:43', 'c751c178fb86aca2b68e0b0c3cf473dfa4fac4d2a9cf21a221781a65a7a112e6', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `newsletter_subscriptions`
--

CREATE TABLE `newsletter_subscriptions` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(1, 'UNRIC', '/uploads/logoPartners/1770292880025-unric_logo-standard-e1629825347279.png', 'https://unric.org/fr/', '2026-02-04 11:07:30', '2026-02-04 11:07:30'),
(2, 'UNDP', '/uploads/logoPartners/1770293162919-undp-logo-blue-large-1-1-e1629824955655.png', 'https://www.undp.org/fr', '2026-02-04 11:09:25', '2026-02-04 11:09:25'),
(3, 'CNC', '/uploads/logoPartners/1770206751802-matrice-logo-e1629825375865.png', 'https://www.cnc.fr/', '2026-02-04 13:05:51', '2026-02-04 13:05:51'),
(4, 'PSL', '/uploads/logoPartners/1770212365734-psl-1-e1629374159330.png', 'https://psl.eu/', '2026-02-04 14:39:25', '2026-02-04 14:39:25'),
(5, 'action campagne', '/uploads/logoPartners/1770650276735-un_sdg_action_campaign_horizontal-e1629823111796.png', NULL, '2026-02-09 16:17:56', '2026-02-09 16:17:56'),
(6, 'action campagne', '/uploads/logoPartners/1770650279206-un_sdg_action_campaign_horizontal-e1629823111796.png', NULL, '2026-02-09 16:17:59', '2026-02-09 16:17:59'),
(7, 'action campagne', '/uploads/logoPartners/1770650280807-un_sdg_action_campaign_horizontal-e1629823111796.png', NULL, '2026-02-09 16:18:00', '2026-02-09 16:18:00'),
(8, 'sacd', '/uploads/logoPartners/1770651117422-logo_sacd-e1629892609581.png', 'https://www.sacd.fr/fr', '2026-02-09 16:31:57', '2026-02-09 16:31:57'),
(9, 'sacd', '/uploads/logoPartners/1770651120278-logo_sacd-e1629892609581.png', 'https://www.sacd.fr/fr', '2026-02-09 16:32:00', '2026-02-09 16:32:00');

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
(1, '1770025899003-42278-1769700554238-432365-MarseilleFuture2.jpg', 1),
(2, '1770038850098-295348-Capture_d___e__cran_2026-02-02_a___14.25.36.png', 2),
(3, '1770038850110-688957-Capture_d___e__cran_2026-02-02_a___14.25.36.png', 2),
(4, '1770038850123-440189-Capture_d___e__cran_2026-02-02_a___14.25.36.png', 2),
(5, '1770038975406-522510-Capture_d___e__cran_2026-02-02_a___14.25.14.png', 3),
(6, '1770038975413-271348-Capture_d___e__cran_2026-02-02_a___14.25.14.png', 3),
(7, '1770038975421-991109-Capture_d___e__cran_2026-02-02_a___14.25.14.png', 3),
(8, '1770039058537-569779-Capture_d___e__cran_2026-02-02_a___14.24.44.png', 4),
(9, '1770039058551-759924-Capture_d___e__cran_2026-02-02_a___14.24.44.png', 4),
(10, '1770039058569-990528-Capture_d___e__cran_2026-02-02_a___14.24.44.png', 4),
(11, '1770209000793-795423-Capture_d___e__cran_2026-02-04_a___13.20.40.png', 5);

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
(2, 'bio', '2026-02-05 11:24:53'),
(1, 'science-fiction', '2026-02-05 10:43:20'),
(2, 'bio', '2026-02-05 11:24:53'),
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
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change',
  `password_reset_token` varchar(255) DEFAULT NULL,
  `password_reset_expires_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password_hash`, `role`, `name`, `last_name`, `created_at`, `updated_at`, `password_reset_token`, `password_reset_expires_at`) VALUES
(4, 'admin@marsai.com', '$2b$10$LKpb/lLynpHJMZWBGGjBMOrhwVGdfLyAEToudVs/OpgS3FO.Ectxq', 'admin', 'Admin', 'MarsAI', '2026-02-13 11:26:24', '2026-02-13 11:32:03', NULL, NULL),
(5, 'loriana.admin@example.com', '$2b$10$UmN49xJrtFcO8UQ5ZucylOXoJgVoGTcDMsYrVpIWjaHXp/JDLcGFq', 'admin', 'Loriana', 'DIANO', '2026-02-16 12:51:33', '2026-02-16 12:51:33', NULL, NULL);

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
  `ownership_certified` tinyint(1) NOT NULL DEFAULT '0',
  `ownership_certified_at` datetime DEFAULT NULL,
  `promo_consent` tinyint(1) NOT NULL DEFAULT '0',
  `promo_consent_at` datetime DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `featured` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `videos`
--

INSERT INTO `videos` (`id`, `youtube_video_id`, `video_file_name`, `title`, `title_en`, `synopsis`, `synopsis_en`, `cover`, `language`, `country`, `duration`, `tech_resume`, `ai_tech`, `creative_resume`, `email`, `director_name`, `director_lastname`, `director_gender`, `birthday`, `mobile_number`, `home_number`, `address`, `director_country`, `discovery_source`, `upload_status`, `ownership_certified`, `ownership_certified_at`, `promo_consent`, `promo_consent_at`, `created_at`, `featured`) VALUES
(1, NULL, '1770025898957-636311-1769701018595-66094-vanessdev_with_futuristic_elements_as_if_Marseille_were_in_th_bf2ca2a2-cd0a-4cf2-9a53-f15a00805802_3.mp4', 'Marseille', 'Marseille in the futur', 'Marseille', 'Marseille', '1770025898999-462581-1769700554238-432365-MarseilleFuture2.jpg', 'fr', 'France', 5, 'Midjourney', 'Midjourney', 'Midjourney', 'loriana.test@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes appt 401 bat 4C', 'France', 'Ami', 'Published', 0, NULL, 0, NULL, '2026-02-03 16:39:22', 0),
(2, NULL, '1770038850058-765059-172528-847499874_tiny.mp4', 'IA Robot', 'IA Robot', 'IA Robot', 'IA Robot', '1770038850082-388631-Capture_d___e__cran_2026-02-02_a___14.25.36.png', 'fr', 'France', 20, 'Midjourney', 'Midjourney', 'Midjourney', 'loriana.test2@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes appt 401 bat 4C', 'France', 'Instagram', 'Published', 0, NULL, 0, NULL, '2026-02-03 16:39:22', 0),
(3, NULL, '1770038975387-771193-174086-850404739_small.mp4', 'La médecine dans le futur', 'Medical in the future', 'La médecine dans le futur', 'Medical in the future', '1770038975398-881832-Capture_d___e__cran_2026-02-02_a___14.25.14.png', 'fr', 'France', 20, 'Midjourney', 'Midjourney', 'Midjourney', 'loriana.test2@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes appt 401 bat 4C', 'France', 'Instagram', 'Published', 0, NULL, 0, NULL, '2026-02-03 16:39:22', 0),
(4, NULL, '1770039058492-56639-305660_tiny.mp4', 'Foret', 'Wood in the future', 'La foret dans le futur', 'Wood in the future', '1770039058520-321317-Capture_d___e__cran_2026-02-02_a___14.24.44.png', 'fr', 'France', 20, 'Midjourney', 'Midjourney', 'Midjourney', 'loriana.test2@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes appt 401 bat 4C', 'France', 'Instagram', 'Published', 0, NULL, 0, NULL, '2026-02-03 16:39:22', 0),
(5, NULL, '1770209000687-484520-7547566-uhd_3840_2160_25fps.mp4', 'Virtual PC', 'Virtual PC', 'Virtual PC', 'Virtual PC', '1770209000744-255216-Capture_d___e__cran_2026-02-04_a___13.20.40.png', 'fr', 'France', 5, 'Krok', 'Krok', 'Krok', 'loriana.test@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes, 33170 GRADIGNAN', 'France', 'Travail', 'Published', 1, '2026-02-04 13:43:21', 1, '2026-02-04 13:43:21', '2026-02-04 13:43:20', 0);

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
(1, 1, '1770025899004-754698-1769700659590-516424-soustitre.srt', NULL, '2026-02-02 10:51:39'),
(2, 2, '1770038850135-506190-1769700659590-516424-soustitre.srt', NULL, '2026-02-02 14:27:30'),
(3, 3, '1770038975433-815321-1769700659590-516424-soustitre.srt', NULL, '2026-02-02 14:29:35'),
(4, 4, '1770039058586-51181-1769700659590-516424-soustitre.srt', NULL, '2026-02-02 14:30:58'),
(5, 5, '1770209000825-731928-1769700659590-516424-soustitre.srt', NULL, '2026-02-04 13:43:20');

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
(10, 2),
(8, 1),
(9, 1),
(10, 1),
(9, 2),
(10, 2),
(11, 1),
(12, 1),
(11, 2),
(12, 2);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `admin_video`
--
ALTER TABLE `admin_video`
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `conference_program`
--
ALTER TABLE `conference_program`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_sort_order` (`sort_order`);

--
-- Index pour la table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_contact_messages_replied_by` (`replied_by`);

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
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `memo_selector`
--
ALTER TABLE `memo_selector`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `newsletter_subscriptions`
--
ALTER TABLE `newsletter_subscriptions`
  ADD PRIMARY KEY (`id`);

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
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idx_users_password_reset_token` (`password_reset_token`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=508;

--
-- AUTO_INCREMENT pour la table `conference_program`
--
ALTER TABLE `conference_program`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

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
-- AUTO_INCREMENT pour la table `newsletter_subscriptions`
--
ALTER TABLE `newsletter_subscriptions`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `parameters`
--
ALTER TABLE `parameters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `social_media`
--
ALTER TABLE `social_media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `still`
--
ALTER TABLE `still`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `video_subtitles`
--
ALTER TABLE `video_subtitles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `admin_video`
--
ALTER TABLE `admin_video`
  ADD CONSTRAINT `admin_video_ibfk_1` FOREIGN KEY (`id`) REFERENCES `users` (`id`);

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
-- Contraintes pour la table `contact_messages`
--
ALTER TABLE `contact_messages`
  ADD CONSTRAINT `fk_contact_messages_replied_by` FOREIGN KEY (`replied_by`) REFERENCES `users` (`id`) ON DELETE SET NULL;

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
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id`) REFERENCES `cms` (`id`);

--
-- Contraintes pour la table `video_subtitles`
--
ALTER TABLE `video_subtitles`
  ADD CONSTRAINT `fk_video_subtitles_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
