-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 12 mars 2026 à 12:18
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
  `type` enum('text','richtext','image','url','number','json','date') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'text',
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
(3, 'home', 'hero', 'protocol', 'fr', 'text', 'le protocole temporel 2026', 1, 1, '2026-02-05 16:28:47', '2026-03-03 15:46:47'),
(4, 'home', 'hero', 'tagline_before', 'fr', 'text', 'Imaginez des', 6, 1, '2026-02-05 16:28:47', '2026-03-03 15:46:47'),
(5, 'home', 'hero', 'tagline_highlight', 'fr', 'text', 'Futurs', 7, 1, '2026-02-05 16:28:47', '2026-03-03 15:46:47'),
(6, 'home', 'hero', 'tagline_after', 'fr', 'text', 'souhaitables', 8, 1, '2026-02-05 16:28:47', '2026-03-03 15:46:47'),
(7, 'home', 'hero', 'desc1', 'fr', 'text', 'Le festival de courts-métrages de 60 secondes réalisés par IA.', 9, 1, '2026-02-05 16:28:47', '2026-03-03 15:46:47'),
(8, 'home', 'hero', 'desc2', 'fr', 'text', '2 jours d\'immersion au cœur de Marseille.', 10, 1, '2026-02-05 16:28:47', '2026-03-03 15:46:47'),
(9, 'home', 'hero', 'ctaParticipate', 'fr', 'text', 'Participer', 11, 1, '2026-02-05 16:28:47', '2026-03-03 15:46:47'),
(10, 'home', 'hero', 'ctaLearnMore', 'fr', 'text', 'à propos', 14, 1, '2026-02-05 16:28:47', '2026-03-03 15:46:47'),
(11, 'home', 'hero', 'protocol', 'en', 'text', 'the 2026 temporal protocol', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(12, 'home', 'hero', 'tagline_before', 'en', 'text', 'Imagine', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(13, 'home', 'hero', 'tagline_highlight', 'en', 'text', 'Futures', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(14, 'home', 'hero', 'tagline_after', 'en', 'text', 'worth imagining', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(15, 'home', 'hero', 'desc1', 'en', 'text', 'the 60-second short film festival', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(16, 'home', 'hero', 'desc2', 'en', 'text', '2 days of immersion in the heart of Marseille.', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(17, 'home', 'hero', 'ctaParticipate', 'en', 'text', 'Participate', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(18, 'home', 'hero', 'ctaLearnMore', 'en', 'text', 'Learn more', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(19, 'home', 'hero', 'title_main', 'fr', 'text', 'mars', 4, 1, '2026-02-05 16:32:23', '2026-03-03 15:46:47'),
(20, 'home', 'hero', 'title_accent', 'fr', 'text', 'ai', 5, 1, '2026-02-05 16:32:23', '2026-03-03 15:46:47'),
(21, 'home', 'hero', 'title_main', 'en', 'text', 'MARS', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(22, 'home', 'hero', 'title_accent', 'en', 'text', 'AI', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(23, 'home', 'hero', 'ctaLearnMore_signe', 'fr', 'image', '/uploads/icons/1771422876669-icons8-plus-96.png', 14, 1, '2026-02-06 09:54:31', '2026-02-18 14:54:36'),
(25, 'home', 'hero', 'ctaParticipate_signe', 'fr', 'image', '/uploads/icons/1771422952133-arrowRight.svg', 11, 1, '2026-02-09 10:41:35', '2026-02-18 14:55:52'),
(27, 'home', 'hero', 'protocol_icon', 'fr', 'image', '/uploads/icons/1771423093750-IconStars.svg', 1, 1, '2026-02-10 11:59:41', '2026-02-18 14:58:13'),
(33, 'home', 'concept', 'title_main', 'fr', 'text', 'Concept du festival MARSAI', 1, 0, '2026-02-10 14:11:53', '2026-03-04 13:24:16'),
(34, 'home', 'concept', 'card1_title', 'fr', 'text', 'Deux minutes', 2, 1, '2026-02-10 14:11:53', '2026-03-04 13:24:16'),
(35, 'home', 'concept', 'card1_description', 'fr', 'text', 'Format ultra-court pour un impact maximum.', 3, 1, '2026-02-10 14:11:53', '2026-03-04 13:24:16'),
(36, 'home', 'concept', 'card2_title', 'fr', 'text', 'Gratuité', 5, 1, '2026-02-10 14:11:53', '2026-03-04 13:24:17'),
(37, 'home', 'concept', 'card2_description', 'fr', 'text', 'Conférences et workshops accessibles.', 6, 1, '2026-02-10 14:11:53', '2026-03-04 13:24:17'),
(38, 'home', 'concept', 'card3_title', 'fr', 'text', 'Pour tous', 8, 1, '2026-02-10 14:11:53', '2026-03-04 13:24:17'),
(39, 'home', 'concept', 'card3_description', 'fr', 'text', 'Professionnels, étudiants et curieux.', 9, 1, '2026-02-10 14:11:53', '2026-03-04 13:24:17'),
(40, 'home', 'concept', 'card4_title', 'fr', 'text', 'Expertise', 11, 1, '2026-02-10 14:11:53', '2026-03-04 13:24:17'),
(41, 'home', 'concept', 'card4_description', 'fr', 'text', 'Leaders mondiaux de l’IA générative.', 12, 1, '2026-02-10 14:11:53', '2026-03-04 13:24:17'),
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
(65, 'home', 'goal', 'card1_title', 'fr', 'text', 'L\'humain au centre', 0, 1, '2026-02-12 13:30:45', '2026-03-02 10:52:21'),
(66, 'home', 'goal', 'card1_description', 'fr', 'text', 'Mettre l\'humain au coeur de la création pour ne pas perdre l\'émotion.', 3, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(67, 'home', 'goal', 'card1_icon', 'fr', 'image', '/uploads/icons/1771329374426-IconTarget.svg', 4, 1, '2026-02-12 13:30:45', '2026-02-17 12:56:14'),
(68, 'home', 'goal', 'card2_title', 'fr', 'text', 'Challenge créatif', 0, 1, '2026-02-12 13:30:45', '2026-03-02 10:55:24'),
(69, 'home', 'goal', 'card2_description', 'fr', 'text', 'Challenger la créativité grâce à un format ultra court de 60s.', 6, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(70, 'home', 'goal', 'card2_icon', 'fr', 'image', '/uploads/icons/1771329374443-IconLightning.svg', 7, 1, '2026-02-12 13:30:45', '2026-02-17 12:56:14'),
(71, 'home', 'goal', 'card3_title', 'fr', 'text', 'Futurs souhaitables', 0, 1, '2026-02-12 13:30:45', '2026-03-02 10:55:34'),
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
(85, 'home', 'concept', 'card1_title_color', 'fr', 'text', '#8780ff', 4, 1, '2026-02-13 10:14:41', '2026-03-04 13:24:16'),
(86, 'home', 'concept', 'card2_title_color', 'fr', 'text', '#c94bd4', 7, 1, '2026-02-13 10:14:41', '2026-03-04 13:24:17'),
(87, 'home', 'concept', 'card3_title_color', 'fr', 'text', '#8780ff', 10, 1, '2026-02-13 10:14:41', '2026-03-04 13:24:17'),
(88, 'home', 'concept', 'card4_title_color', 'fr', 'text', '#e045b1', 13, 1, '2026-02-13 10:14:41', '2026-03-04 13:24:17'),
(89, 'home', 'concept', 'card1_title_color', 'en', 'text', '#8780ff', 4, 1, '2026-02-13 10:14:41', '2026-03-04 13:24:17'),
(90, 'home', 'concept', 'card2_title_color', 'en', 'text', '#c94bd4', 7, 1, '2026-02-13 10:14:41', '2026-03-04 13:24:17'),
(91, 'home', 'concept', 'card3_title_color', 'en', 'text', '#8780ff', 10, 1, '2026-02-13 10:14:41', '2026-03-04 13:24:17'),
(92, 'home', 'concept', 'card4_title_color', 'en', 'text', '#e045b1', 13, 1, '2026-02-13 10:14:41', '2026-03-04 13:24:17'),
(93, 'home', 'hero', 'media', 'fr', 'image', '/uploads/medias/1772537714709-324321875.mp4', 3, 1, '2026-02-13 14:11:45', '2026-03-03 12:35:14'),
(95, 'home', 'hero', 'ctaLearnMore_link', 'fr', 'text', '/About', 16, 1, '2026-02-15 17:12:57', '2026-03-03 15:46:47'),
(97, 'home', 'hero', 'ctaParticipate_link', 'fr', 'text', '/learnmore', 13, 1, '2026-02-15 17:15:38', '2026-03-03 15:46:47'),
(99, 'home', 'events', 'title_main', 'fr', 'text', 'Deux journées de', 0, 1, '2026-02-16 10:19:58', '2026-02-17 15:49:51'),
(100, 'home', 'events', 'title_main_color', 'fr', 'text', '#000000', 1, 1, '2026-02-16 10:19:58', '2026-02-17 15:50:16'),
(101, 'home', 'events', 'title_accent', 'fr', 'text', 'Conférences gratuites', 2, 1, '2026-02-16 10:19:58', '2026-02-17 15:49:51'),
(102, 'home', 'events', 'title_accent_color', 'fr', 'text', '#AD46FF', 3, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(103, 'home', 'events', 'list_item1', 'fr', 'text', 'Débats engagés sur l’éthique et le futur', 0, 1, '2026-02-16 10:19:58', '2026-02-17 11:31:05'),
(104, 'home', 'events', 'list_item2', 'fr', 'text', 'Confrontations d\'idées entre artistes et tech', 5, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(105, 'home', 'events', 'list_item3', 'fr', 'text', 'Interrogations stimulantes sur la création', 6, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(106, 'home', 'events', 'ctaAgenda', 'fr', 'text', 'Agenda Complet', 7, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(107, 'home', 'events', 'ctaAgenda_link', 'fr', 'text', '/events', 8, 1, '2026-02-16 10:19:58', '2026-02-16 10:19:58'),
(108, 'home', 'events', 'ctaAgenda_icon', 'fr', 'text', '/uploads/icons/1772456025078-IconCalendar.svg', 10, 1, '2026-02-16 10:19:58', '2026-03-02 13:53:45'),
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
(133, 'home', 'events', 'ctaAgenda_icon', 'en', 'text', '/uploads/icons/1772456025110-IconCalendar.svg', 10, 1, '2026-02-16 10:21:23', '2026-03-02 13:53:45'),
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
(149, 'home', 'closingEvent', 'eyebrow', 'fr', 'text', 'Soirée de Clôture', 1, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(150, 'home', 'closingEvent', 'eyebrow_text_color', 'fr', 'text', '#C27AFF', 2, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(151, 'home', 'closingEvent', 'eyebrow_bg_color', 'fr', 'text', 'rgba(173, 70, 255, 0.2)', 3, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(152, 'home', 'closingEvent', 'title_main', 'fr', 'text', 'MARS.A.I', 4, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(153, 'home', 'closingEvent', 'title_main_color', 'fr', 'text', '', 4, 1, '2026-02-16 10:31:29', '2026-02-16 10:31:29'),
(154, 'home', 'closingEvent', 'title_accent', 'fr', 'text', 'NIGHT', 6, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(155, 'home', 'closingEvent', 'title_accent_color', 'fr', 'text', '#F6339A', 7, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(156, 'home', 'closingEvent', 'description_ligne1', 'fr', 'text', 'Fête Électro mêlant IA et futurs souhaitables.', 8, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(157, 'home', 'closingEvent', 'description_ligne2', 'fr', 'text', 'Une expérience immersive sonore et visuelle.', 9, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(158, 'home', 'closingEvent', 'card_icon', 'fr', 'text', '/uploads/icons/1772463389134-IconClock.svg', 10, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(159, 'home', 'closingEvent', 'card_date', 'fr', 'text', '13 JUIN', 0, 1, '2026-02-16 10:31:29', '2026-03-04 10:30:20'),
(160, 'home', 'closingEvent', 'card_hour', 'fr', 'text', 'DÈS 19H00', 12, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(161, 'home', 'closingEvent', 'card_localisation', 'fr', 'text', 'MARSEILLE', 13, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(162, 'home', 'closingEvent', 'card_ctaBooking', 'fr', 'text', 'Réserver', 14, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(163, 'home', 'closingEvent', 'card_ctaBooking_link', 'fr', 'text', '/events', 15, 1, '2026-02-16 10:31:29', '2026-03-02 15:56:29'),
(164, 'home', 'closingEvent', 'eyebrow', 'en', 'text', 'Closing Night', 0, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(165, 'home', 'closingEvent', 'eyebrow_text_color', 'en', 'text', '#C27AFF', 1, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(166, 'home', 'closingEvent', 'eyebrow_bg_color', 'en', 'text', 'rgba(173, 70, 255, 0.2)', 2, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(167, 'home', 'closingEvent', 'title_main', 'en', 'text', 'MARS.A.I', 3, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(168, 'home', 'closingEvent', 'title_main_color', 'en', 'text', '', 4, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(169, 'home', 'closingEvent', 'title_accent', 'en', 'text', 'NIGHT', 5, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(170, 'home', 'closingEvent', 'title_accent_color', 'en', 'text', '#F6339A', 6, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(171, 'home', 'closingEvent', 'description_ligne1', 'en', 'text', 'An electro party blending AI and desirable futures.', 7, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(172, 'home', 'closingEvent', 'description_ligne2', 'en', 'text', 'An immersive sound and visual experience.', 8, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(173, 'home', 'closingEvent', 'card_icon', 'en', 'text', '/uploads/icons/1772463389145-IconClock.svg', 10, 1, '2026-02-16 10:31:45', '2026-03-02 15:56:29'),
(174, 'home', 'closingEvent', 'card_date', 'en', 'text', 'JUNE 13', 10, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(175, 'home', 'closingEvent', 'card_hour', 'en', 'text', 'FROM 7:00 PM', 11, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(176, 'home', 'closingEvent', 'card_localisation', 'en', 'text', 'MARSEILLE', 12, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(177, 'home', 'closingEvent', 'card_ctaBooking', 'en', 'text', 'Book now', 13, 1, '2026-02-16 10:31:45', '2026-02-16 10:31:45'),
(178, 'home', 'closingEvent', 'card_ctaBooking_link', 'en', 'text', '/events', 15, 1, '2026-02-16 10:31:45', '2026-03-02 15:56:29'),
(179, 'home', 'localisationEvent', 'eyebrow', 'fr', 'text', 'Le lieu', 1, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(180, 'home', 'localisationEvent', 'eyebrow_icon', 'fr', 'text', '/uploads/icons/1772545516824-IconLocalisation.svg', 2, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(181, 'home', 'localisationEvent', 'eyebrow_color', 'fr', 'text', '', 2, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(182, 'home', 'localisationEvent', 'venue_namePart1', 'fr', 'text', 'La', 4, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(183, 'home', 'localisationEvent', 'venue_namePart2', 'fr', 'text', 'Plateforme', 5, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(184, 'home', 'localisationEvent', 'venue_cityTagline', 'fr', 'text', 'Marseille, Hub Créatif', 6, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(185, 'home', 'localisationEvent', 'venue_color', 'fr', 'text', '#51A2FF', 7, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(186, 'home', 'localisationEvent', 'address_street', 'fr', 'text', '12 Rue d\'Uzes', 8, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(187, 'home', 'localisationEvent', 'address_postalCode', 'fr', 'text', '13002', 9, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(188, 'home', 'localisationEvent', 'address_city', 'fr', 'text', 'Marseille', 10, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(189, 'home', 'localisationEvent', 'address_color', 'fr', 'text', '', 10, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(190, 'home', 'localisationEvent', 'access_tram', 'fr', 'text', 'Accès Tram T2/T3 – Arrêt Arenc Le Silo', 12, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(191, 'home', 'localisationEvent', 'access_color', 'fr', 'text', '', 12, 1, '2026-02-16 10:51:33', '2026-02-16 10:51:33'),
(192, 'home', 'localisationEvent', 'space1_name', 'fr', 'text', 'Salle des Sucres', 0, 1, '2026-02-16 10:51:33', '2026-03-04 11:19:45'),
(193, 'home', 'localisationEvent', 'space1_description', 'fr', 'text', 'Futur sanctuaire des conférences et de la remise des prix de Mars.A.I. Un espace majestueux alliant patrimoine et technologie.', 15, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(194, 'home', 'localisationEvent', 'space1_color', 'fr', 'text', '#51A2FF', 16, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(195, 'home', 'localisationEvent', 'space2_name', 'fr', 'text', 'Salle PLAZA', 17, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(196, 'home', 'localisationEvent', 'space2_description', 'fr', 'text', 'L\'épicentre du festival : accueil, animations, workshops et restauration. Le point de rencontre de tous les participants.', 18, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(197, 'home', 'localisationEvent', 'space2_color', 'fr', 'text', '#C27AFF', 19, 1, '2026-02-16 10:51:33', '2026-03-03 14:45:16'),
(198, 'home', 'localisationEvent', 'maps_link', 'fr', 'text', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8044.241161952438!2d5.362378323117001!3d43.314391970182314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c13ddc0211b9%3A0xd1642ae4b32c4bc4!2s%C3%89cole%20La%20Plateforme_%20Marseille%20-%20Entr%C3%A9e%20Sud!5e1!3m2!1sfr!2sfr!4v1769784840463!5m2!1sfr!2sfr', 0, 1, '2026-02-16 10:51:33', '2026-03-04 11:22:47'),
(199, 'home', 'localisationEvent', 'eyebrow', 'en', 'text', 'The Venue', 0, 1, '2026-02-16 10:51:52', '2026-02-16 10:51:52'),
(200, 'home', 'localisationEvent', 'eyebrow_icon', 'en', 'text', '/uploads/icons/1772545516835-IconLocalisation.svg', 2, 1, '2026-02-16 10:51:52', '2026-03-03 14:45:16'),
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
(218, 'home', 'localisationEvent', 'maps_link', 'en', 'text', 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d8044.241161952438!2d5.362378323117001!3d43.314391970182314!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c13ddc0211b9%3A0xd1642ae4b32c4bc4!2s%C3%89cole%20La%20Plateforme_%20Marseille%20-%20Entr%C3%A9e%20Sud!5e1!3m2!1sfr!2sfr!4v1769784840463!5m2!1sfr!2sfr', 20, 1, '2026-02-16 10:51:52', '2026-03-03 14:45:16'),
(219, 'home', 'projectedStats', 'heading_title_main', 'fr', 'text', 'Chiffres', 0, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(220, 'home', 'projectedStats', 'heading_title_main_color', 'fr', 'text', '', 1, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(221, 'home', 'projectedStats', 'heading_title_accent', 'fr', 'text', 'Projetés', 2, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(222, 'home', 'projectedStats', 'heading_title_accent_color', 'fr', 'text', '#F6339A', 3, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(223, 'home', 'projectedStats', 'heading_tagline', 'fr', 'text', 'Échelle mondiale, impact local.', 4, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(224, 'home', 'projectedStats', 'stat1_value', 'fr', 'text', '+120', 0, 1, '2026-02-16 11:04:18', '2026-03-04 12:50:12'),
(225, 'home', 'projectedStats', 'stat1_label', 'fr', 'text', 'Pays représentés', 6, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(226, 'home', 'projectedStats', 'stat1_label_color', 'fr', 'text', '#AD46FF', 7, 1, '2026-02-16 11:04:18', '2026-02-16 11:04:18'),
(227, 'home', 'projectedStats', 'stat2_value', 'fr', 'text', '+600', 0, 1, '2026-02-16 11:04:18', '2026-03-04 12:50:24'),
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
(335, 'home', 'hero', 'media', 'en', 'image', '/uploads/medias/1772537714748-951057446.mp4', 3, 1, '2026-02-18 15:16:45', '2026-03-03 12:35:14'),
(359, 'home', 'hero', 'ctaParticipate_link', 'en', 'text', '/learnmore', 13, 1, '2026-02-18 15:23:05', '2026-03-03 15:46:47'),
(362, 'home', 'hero', 'ctaLearnMore_link', 'en', 'text', '/About', 16, 1, '2026-02-18 15:23:05', '2026-03-03 15:46:47'),
(363, 'home', 'header', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-02-19 08:56:35', '2026-02-19 08:56:35'),
(364, 'home', 'header', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-02-19 08:56:35', '2026-02-19 08:56:35'),
(365, 'home', 'hero', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-02-19 09:40:23', '2026-03-03 15:46:47'),
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
(481, 'home', 'concept', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-02-20 11:50:44', '2026-03-04 13:24:16'),
(482, 'home', 'concept', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-02-20 11:50:44', '2026-02-20 11:50:44'),
(499, 'home', 'award', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-02-20 15:02:49', '2026-02-20 17:18:32'),
(500, 'home', 'award', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-02-20 15:02:49', '2026-02-20 15:05:35'),
(501, 'home', 'award', 'ctaSeeMore_link', 'en', 'text', '/gallery', 7, 1, '2026-02-20 15:27:48', '2026-02-20 15:27:48'),
(607, 'layout', 'footer', 'brand_logo', 'fr', 'image', '/uploads/medias/logo.png', 0, 1, '2026-02-23 14:53:41', '2026-03-12 10:14:53'),
(608, 'layout', 'footer', 'brand_quote', 'fr', 'richtext', '“La plateforme mondiale de la narration générative, ancrée dans la lumière de Marseille.”', 1, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(609, 'layout', 'footer', 'sections_navigation', 'fr', 'text', 'NAVIGATION', 2, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(610, 'layout', 'footer', 'sections_legal', 'fr', 'text', 'LÉGAL', 3, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(611, 'layout', 'footer', 'links_gallery_label', 'fr', 'text', 'Galerie', 4, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(612, 'layout', 'footer', 'links_gallery_href', 'fr', 'text', '/gallery', 5, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(613, 'layout', 'footer', 'links_program_label', 'fr', 'text', 'Programme', 6, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(614, 'layout', 'footer', 'links_program_href', 'fr', 'text', '/events', 7, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(615, 'layout', 'footer', 'links_jury_label', 'fr', 'text', 'Jury', 8, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(616, 'layout', 'footer', 'links_jury_href', 'fr', 'text', '/jury', 9, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(617, 'layout', 'footer', 'links_partners_label', 'fr', 'text', 'Partenaires', 10, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(618, 'layout', 'footer', 'links_partners_href', 'fr', 'text', '/partners', 11, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(619, 'layout', 'footer', 'links_faq_label', 'fr', 'text', 'FAQ', 12, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(620, 'layout', 'footer', 'links_faq_href', 'fr', 'text', '/faq', 13, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(621, 'layout', 'footer', 'links_contact_label', 'fr', 'text', 'Contact', 14, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(622, 'layout', 'footer', 'links_contact_href', 'fr', 'text', '/contact', 15, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(623, 'layout', 'footer', 'links_legal_label', 'fr', 'text', 'Mentions légales', 16, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(624, 'layout', 'footer', 'links_legal_href', 'fr', 'text', '/legal', 17, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(625, 'layout', 'footer', 'bottom_copyright', 'fr', 'text', '© 2026 MARS.AI PROTOCOL · MARSEILLE HUB', 18, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(626, 'layout', 'footer', 'bottom_designSystem', 'fr', 'text', 'DESIGN SYSTÈME CYBER-PREMIUM', 19, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(627, 'layout', 'footer', 'social_facebook_label', 'fr', 'text', 'Facebook', 21, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(628, 'layout', 'footer', 'social_facebook_href', 'fr', 'text', 'https://www.facebook.com', 22, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(629, 'layout', 'footer', 'social_facebook_icon', 'fr', 'image', '/uploads/icons/1773307763306-facebook.png', 23, 1, '2026-02-23 14:53:41', '2026-03-12 10:29:23'),
(630, 'layout', 'footer', 'social_instagram_label', 'fr', 'text', 'Instagram', 24, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(631, 'layout', 'footer', 'social_instagram_href', 'fr', 'text', 'https://www.instagram.com', 25, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(632, 'layout', 'footer', 'social_instagram_icon', 'fr', 'image', '/uploads/icons/1773307618268-instagram.png', 26, 1, '2026-02-23 14:53:41', '2026-03-12 10:26:58'),
(633, 'layout', 'footer', 'social_youtube_label', 'fr', 'text', 'YouTube', 27, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(634, 'layout', 'footer', 'social_youtube_href', 'fr', 'text', 'https://www.youtube.com', 28, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(635, 'layout', 'footer', 'social_youtube_icon', 'fr', 'image', '/uploads/icons/1773307618297-youtube.png', 29, 1, '2026-02-23 14:53:41', '2026-03-12 10:26:58'),
(636, 'layout', 'footer', 'social_x_label', 'fr', 'text', 'X', 30, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(637, 'layout', 'footer', 'social_x_href', 'fr', 'text', 'https://x.com', 31, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(638, 'layout', 'footer', 'social_x_icon', 'fr', 'image', '/uploads/icons/1771922102031-x.png', 31, 1, '2026-02-23 14:53:41', '2026-02-24 09:38:04'),
(639, 'layout', 'footer', 'aria_openSocial', 'fr', 'text', 'Ouvrir {{name}}', 33, 1, '2026-02-23 14:53:41', '2026-03-12 13:16:58'),
(673, 'layout', 'footer', 'brand_logo', 'en', 'image', '/uploads/medias/logo.png', 1, 1, '2026-02-23 14:54:14', '2026-03-12 10:13:41'),
(674, 'layout', 'footer', 'brand_quote', 'en', 'text', '“The global platform for generative storytelling, rooted in the light of Marseille.”', 2, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(675, 'layout', 'footer', 'sections_navigation', 'en', 'text', 'NAVIGATION', 3, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(676, 'layout', 'footer', 'sections_legal', 'en', 'text', 'LEGAL', 4, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(677, 'layout', 'footer', 'links_gallery_label', 'en', 'text', 'Gallery', 5, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(678, 'layout', 'footer', 'links_gallery_href', 'en', 'text', '/gallery', 5, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(679, 'layout', 'footer', 'links_program_label', 'en', 'text', 'Program', 7, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(680, 'layout', 'footer', 'links_program_href', 'en', 'text', '/events', 7, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(681, 'layout', 'footer', 'links_jury_label', 'en', 'text', 'Jury', 9, 1, '2026-02-23 14:54:14', '2026-03-09 14:23:24'),
(682, 'layout', 'footer', 'links_tickets_href', 'en', 'text', '/tickets', 10, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(683, 'layout', 'footer', 'links_partners_label', 'en', 'text', 'Partners', 11, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(684, 'layout', 'footer', 'links_partners_href', 'en', 'text', '/partners', 11, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(685, 'layout', 'footer', 'links_faq_label', 'en', 'text', 'FAQ', 13, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(686, 'layout', 'footer', 'links_faq_href', 'en', 'text', '/faq', 13, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(687, 'layout', 'footer', 'links_contact_label', 'en', 'text', 'Contact', 15, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(688, 'layout', 'footer', 'links_contact_href', 'en', 'text', '/contact', 15, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(689, 'layout', 'footer', 'links_legal_label', 'en', 'text', 'Legal notice', 17, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(690, 'layout', 'footer', 'links_legal_href', 'en', 'text', '/legal', 17, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(691, 'layout', 'footer', 'bottom_copyright', 'en', 'text', '© 2026 MARS.AI PROTOCOL · MARSEILLE HUB', 19, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(692, 'layout', 'footer', 'bottom_designSystem', 'en', 'text', 'CYBER-PREMIUM DESIGN SYSTEM', 20, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(693, 'layout', 'footer', 'social_facebook_label', 'en', 'text', 'Facebook', 21, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(694, 'layout', 'footer', 'social_facebook_href', 'en', 'text', 'https://www.facebook.com', 22, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(695, 'layout', 'footer', 'social_facebook_icon', 'en', 'image', '/uploads/icons/1773307763314-facebook.png', 23, 1, '2026-02-23 14:54:14', '2026-03-12 10:29:23'),
(696, 'layout', 'footer', 'social_instagram_label', 'en', 'text', 'Instagram', 24, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(697, 'layout', 'footer', 'social_instagram_href', 'en', 'text', 'https://www.instagram.com', 25, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(698, 'layout', 'footer', 'social_instagram_icon', 'en', 'image', '/uploads/icons/1773307618275-instagram.png', 26, 1, '2026-02-23 14:54:14', '2026-03-12 10:26:58'),
(699, 'layout', 'footer', 'social_youtube_label', 'en', 'text', 'YouTube', 27, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(700, 'layout', 'footer', 'social_youtube_href', 'en', 'text', 'https://www.youtube.com', 28, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(701, 'layout', 'footer', 'social_youtube_icon', 'en', 'image', '/uploads/icons/1773307618304-youtube.png', 29, 1, '2026-02-23 14:54:14', '2026-03-12 10:26:58'),
(702, 'layout', 'footer', 'social_x_label', 'en', 'text', 'X', 30, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(703, 'layout', 'footer', 'social_x_href', 'en', 'text', 'https://x.com', 31, 1, '2026-02-23 14:54:14', '2026-03-12 13:16:58'),
(704, 'layout', 'footer', 'social_x_icon', 'en', 'image', '/icons/social/x.png', 32, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(705, 'layout', 'footer', 'aria_openSocial', 'en', 'text', 'Open {{name}}', 33, 1, '2026-02-23 14:54:14', '2026-02-23 14:54:14'),
(772, 'layout', 'footer', 'social_is_active', 'fr', 'text', '1', 999, 1, '2026-02-24 09:57:06', '2026-03-12 13:16:58'),
(773, 'layout', 'footer', 'social_is_active', 'en', 'text', '1', 999, 1, '2026-02-24 09:57:06', '2026-03-12 13:16:58'),
(774, 'layout', 'footer', 'newsletter_is_active', 'fr', 'text', '1', 1000, 1, '2026-02-24 09:57:06', '2026-03-12 13:16:58'),
(775, 'layout', 'footer', 'newsletter_is_active', 'en', 'text', '1', 1000, 1, '2026-02-24 09:57:06', '2026-03-12 13:16:58'),
(776, 'layout', 'footer', 'social', 'fr', 'text', NULL, 0, 1, '2026-02-24 10:24:03', '2026-03-09 15:22:16'),
(778, 'layout', 'footer', 'newsletter', 'fr', 'text', NULL, 0, 1, '2026-02-24 10:24:43', '2026-02-24 10:31:04'),
(849, 'home', 'goal', 'section_visibility', 'fr', 'text', NULL, 0, 1, '2026-03-02 10:02:34', '2026-03-02 10:45:01'),
(865, 'home', 'events', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-03-02 11:02:33', '2026-03-02 13:03:05'),
(867, 'home', 'goal', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-02 12:54:49', '2026-03-02 12:54:49'),
(871, 'home', 'events', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-02 12:58:18', '2026-03-02 12:58:18'),
(928, 'home', 'localisationEvent', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-03-03 12:51:36', '2026-03-03 14:45:16'),
(929, 'home', 'localisationEvent', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-03 12:51:44', '2026-03-03 12:51:44'),
(1034, 'gallery', 'hero', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-03-06 16:03:45', '2026-03-09 13:47:32'),
(1035, 'gallery', 'hero', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-06 16:03:45', '2026-03-06 16:03:45'),
(1036, 'gallery', 'hero', 'title_main', 'fr', 'text', 'LA GALERIE DES', 0, 1, '2026-03-06 16:03:45', '2026-03-09 13:47:39'),
(1037, 'gallery', 'hero', 'title_main', 'en', 'text', 'THE GALLERY OF', 0, 1, '2026-03-06 16:03:45', '2026-03-06 16:03:45'),
(1038, 'gallery', 'hero', 'title_accent', 'fr', 'text', 'FILMS', 0, 1, '2026-03-06 16:03:45', '2026-03-09 13:47:48'),
(1039, 'gallery', 'hero', 'title_accent', 'en', 'text', 'FILMS', 0, 1, '2026-03-06 16:03:45', '2026-03-06 16:03:45'),
(1052, 'gallery', 'hero', 'description', 'fr', 'text', 'Bienvenue sur la gallerie.', 2, 0, '2026-03-09 16:09:01', '2026-03-09 16:10:31'),
(1053, 'gallery', 'hero', 'description', 'en', 'text', '', 2, 0, '2026-03-09 16:09:09', '2026-03-09 16:09:09'),
(1054, 'gallery', 'countdown', 'countdown_is_visible', 'fr', 'text', '1', 1, 1, '2026-03-09 16:41:44', '2026-03-09 16:41:44'),
(1055, 'gallery', 'countdown', 'countdown_is_visible', 'en', 'text', '1', 1, 1, '2026-03-09 16:42:05', '2026-03-09 16:42:05'),
(1098, 'gallery', 'countdown', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-03-10 10:08:52', '2026-03-10 14:45:17'),
(1099, 'gallery', 'countdown', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-10 10:08:52', '2026-03-10 10:08:52'),
(1100, 'gallery', 'countdown', 'title_main', 'fr', 'text', 'Mars', 1, 1, '2026-03-10 10:08:52', '2026-03-10 14:45:17'),
(1101, 'gallery', 'countdown', 'title_main', 'en', 'text', 'Mars', 0, 1, '2026-03-10 10:08:52', '2026-03-10 10:08:52'),
(1102, 'gallery', 'countdown', 'title_accent', 'fr', 'text', 'AI', 2, 1, '2026-03-10 10:08:52', '2026-03-10 14:45:17'),
(1103, 'gallery', 'countdown', 'title_accent', 'en', 'text', 'AI', 0, 1, '2026-03-10 10:08:52', '2026-03-10 10:08:52'),
(1104, 'gallery', 'countdown', 'description', 'fr', 'text', 'Le Festival sera en ligne entre le 02 et le 30 novembre 2026. Vous retrouverez les courts-métrages dans cette page à cette date !', 3, 1, '2026-03-10 10:08:52', '2026-03-10 14:45:17'),
(1105, 'gallery', 'countdown', 'description', 'en', 'text', 'The Festival will be online between November 2 and November 30, 2026. You will find the short films on this page on that date!', 0, 1, '2026-03-10 10:08:52', '2026-03-10 10:08:52');
INSERT INTO `cms` (`id`, `page`, `section`, `content_key`, `locale`, `type`, `value`, `order_index`, `is_active`, `created_at`, `updated_at`) VALUES
(1106, 'gallery', 'countdown', 'badge', 'fr', 'text', 'OUVERTURE DU FESTIVAL DANS', 4, 1, '2026-03-10 10:08:52', '2026-03-10 14:45:17'),
(1107, 'gallery', 'countdown', 'badge', 'en', 'text', 'FESTIVAL OPENS IN', 0, 1, '2026-03-10 10:08:52', '2026-03-10 10:08:52'),
(1108, 'gallery', 'countdown', 'countdown', 'fr', 'text', '1', 5, 1, '2026-03-10 10:08:52', '2026-03-10 14:45:17'),
(1109, 'gallery', 'countdown', 'countdown', 'en', 'text', '1', 0, 1, '2026-03-10 10:08:52', '2026-03-10 10:08:52'),
(1110, 'gallery', 'countdown', 'target', 'fr', 'text', 'Date cible', 6, 1, '2026-03-10 10:08:52', '2026-03-10 14:45:17'),
(1111, 'gallery', 'countdown', 'target', 'en', 'text', 'Target date', 0, 1, '2026-03-10 10:08:52', '2026-03-10 10:08:52'),
(1128, 'gallery', 'countdown', 'start_date', 'fr', 'date', '2026-03-10', 7, 1, '2026-03-10 14:16:44', '2026-03-10 14:45:17'),
(1129, 'gallery', 'countdown', 'start_date', 'en', 'date', '2026-03-10', 7, 1, '2026-03-10 14:16:44', '2026-03-10 14:45:17'),
(1130, 'gallery', 'countdown', 'end_date', 'fr', 'date', '2026-11-27', 8, 1, '2026-03-10 14:16:44', '2026-03-10 14:45:17'),
(1131, 'gallery', 'countdown', 'end_date', 'en', 'date', '2026-11-27', 8, 1, '2026-03-10 14:16:44', '2026-03-10 14:45:17'),
(1154, 'gallery', 'grid', 'section_visibility', 'fr', 'text', '1', 0, 0, '2026-03-10 15:31:33', '2026-03-10 15:56:00'),
(1155, 'gallery', 'grid', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-10 15:31:33', '2026-03-10 15:31:33'),
(1156, 'gallery', 'grid', 'search_visibility', 'fr', 'text', '1', 0, 1, '2026-03-10 15:31:33', '2026-03-10 15:53:57'),
(1157, 'gallery', 'grid', 'search_visibility', 'en', 'text', '1', 0, 1, '2026-03-10 15:31:33', '2026-03-10 15:31:33'),
(1158, 'gallery', 'grid', 'films_grid_visibility', 'fr', 'text', '1', 0, 1, '2026-03-10 15:31:33', '2026-03-10 15:54:08'),
(1159, 'gallery', 'grid', 'films_grid_visibility', 'en', 'text', '1', 0, 1, '2026-03-10 15:31:33', '2026-03-10 15:31:33'),
(1169, 'jury', 'hero', 'title_main', 'fr', 'text', 'Les membres', 1, 1, '2026-03-10 16:20:42', '2026-03-10 16:48:32'),
(1170, 'jury', 'hero', 'title_main', 'en', 'text', 'THE MEMBERS', 0, 1, '2026-03-10 16:20:42', '2026-03-10 16:20:42'),
(1171, 'jury', 'hero', 'title_accent', 'fr', 'text', 'du jury', 2, 1, '2026-03-10 16:20:42', '2026-03-10 16:48:32'),
(1172, 'jury', 'hero', 'title_accent', 'en', 'text', 'OF THE JURY', 0, 1, '2026-03-10 16:20:42', '2026-03-10 16:20:42'),
(1173, 'jury', 'hero', 'description', 'fr', 'text', 'Description', 0, 0, '2026-03-10 16:28:31', '2026-03-10 16:49:44'),
(1174, 'jury', 'hero', 'description', 'en', 'text', 'Description', 0, 1, '2026-03-10 16:28:31', '2026-03-10 16:28:31'),
(1175, 'jury', 'hero', 'section_visibility', 'fr', 'text', NULL, 0, 1, '2026-03-10 16:45:57', '2026-03-10 16:46:06'),
(1190, 'partners', 'hero', 'title_main', 'fr', 'text', 'Nos', 0, 1, '2026-03-11 09:43:47', '2026-03-11 09:43:47'),
(1191, 'partners', 'hero', 'title_main', 'en', 'text', 'Our', 0, 1, '2026-03-11 09:43:47', '2026-03-11 09:43:47'),
(1192, 'partners', 'hero', 'title_accent', 'fr', 'text', 'Soutiens', 0, 1, '2026-03-11 09:43:47', '2026-03-11 09:43:47'),
(1193, 'partners', 'hero', 'title_accent', 'en', 'text', 'Supporters', 0, 1, '2026-03-11 09:43:47', '2026-03-11 09:43:47'),
(1194, 'partners', 'hero', 'description', 'fr', 'text', 'Nos partenaires sont issue de plusieurs secteurs...', 0, 1, '2026-03-11 09:52:29', '2026-03-11 09:52:29'),
(1195, 'partners', 'hero', 'description', 'en', 'text', 'Our partners come from a variety of sectors...', 0, 1, '2026-03-11 09:52:29', '2026-03-11 09:52:29'),
(1196, 'partners', 'hero', 'section_visibility', 'fr', 'text', NULL, 0, 1, '2026-03-11 10:36:02', '2026-03-11 10:36:08'),
(1201, 'jury', 'hero', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-11 10:41:19', '2026-03-11 10:41:19'),
(1202, 'partners', 'hero', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-11 10:41:19', '2026-03-11 10:41:19'),
(1218, 'layout', 'footer', 'links_jury_href', 'en', 'text', '/jury', 9, 1, '2026-03-12 10:21:40', '2026-03-12 13:16:58'),
(1397, 'faq', 'hero', 'title_main', 'fr', 'text', 'FAQ', 0, 0, '2026-03-12 10:47:18', '2026-03-12 11:00:25'),
(1398, 'faq', 'hero', 'title_main', 'en', 'text', 'FAQ', 0, 1, '2026-03-12 10:47:18', '2026-03-12 10:47:18'),
(1399, 'faq', 'hero', 'title_accent', 'fr', 'text', 'FAQ', 0, 1, '2026-03-12 10:47:18', '2026-03-12 10:59:25'),
(1400, 'faq', 'hero', 'title_accent', 'en', 'text', 'FAQ', 0, 1, '2026-03-12 10:47:18', '2026-03-12 10:59:41'),
(1401, 'faq', 'hero', 'description', 'fr', 'text', 'Description', 0, 0, '2026-03-12 10:47:18', '2026-03-12 11:11:50'),
(1402, 'faq', 'hero', 'description', 'en', 'text', 'Description', 0, 1, '2026-03-12 10:47:18', '2026-03-12 10:47:18'),
(1408, 'contact', 'hero', 'title_main', 'fr', 'text', 'Contact', 0, 1, '2026-03-12 11:25:11', '2026-03-12 11:25:11'),
(1409, 'contact', 'hero', 'title_main', 'en', 'text', 'Contact', 0, 1, '2026-03-12 11:25:11', '2026-03-12 11:25:11'),
(1410, 'contact', 'hero', 'title_accent', 'fr', 'text', '', 0, 0, '2026-03-12 11:25:11', '2026-03-12 11:39:46'),
(1411, 'contact', 'hero', 'title_accent', 'en', 'text', '', 0, 1, '2026-03-12 11:25:11', '2026-03-12 11:25:11'),
(1412, 'contact', 'hero', 'description', 'fr', 'text', 'Description', 0, 0, '2026-03-12 11:25:11', '2026-03-12 11:39:44'),
(1413, 'contact', 'hero', 'description', 'en', 'text', 'Description', 0, 1, '2026-03-12 11:25:11', '2026-03-12 11:25:11'),
(1416, 'legal', 'hero', 'section_visibility', 'fr', 'text', '1', 0, 1, '2026-03-12 11:53:03', '2026-03-12 12:06:13'),
(1417, 'legal', 'hero', 'section_visibility', 'en', 'text', '1', 0, 1, '2026-03-12 11:53:03', '2026-03-12 11:53:03'),
(1418, 'legal', 'hero', 'title_main', 'fr', 'text', 'Mentions légales', 0, 1, '2026-03-12 11:53:03', '2026-03-12 11:53:03'),
(1419, 'legal', 'hero', 'title_main', 'en', 'text', 'Legal notice', 0, 1, '2026-03-12 11:53:03', '2026-03-12 11:53:03'),
(1420, 'legal', 'hero', 'title_accent', 'fr', 'text', '', 0, 0, '2026-03-12 11:53:03', '2026-03-12 11:58:17'),
(1421, 'legal', 'hero', 'title_accent', 'en', 'text', '', 0, 1, '2026-03-12 11:53:03', '2026-03-12 11:53:03'),
(1422, 'legal', 'hero', 'description', 'fr', 'text', 'Informations légales relatives au site et au projet MarsAI.', 0, 1, '2026-03-12 11:53:03', '2026-03-12 11:58:15'),
(1423, 'legal', 'hero', 'description', 'en', 'text', 'Legal information relating to the website and the MarsAI project.', 0, 1, '2026-03-12 11:53:03', '2026-03-12 11:53:03');

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
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `day` enum('Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday') NOT NULL DEFAULT 'Friday'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `conference_program`
--

INSERT INTO `conference_program` (`id`, `time`, `title`, `speaker`, `color`, `sort_order`, `created_at`, `updated_at`, `day`) VALUES
(1, '09:30', 'Accueil & Café Networking', NULL, 'bg-sky-400', 1, '2026-02-16 15:26:30', '2026-02-22 14:47:09', 'Friday'),
(2, '10:30', 'Conférence d\'ouverture : L\'IA au service du Cinéma', 'Par : Jean-Luc Godart', 'bg-emerald-400', 2, '2026-02-16 15:26:30', '2026-02-25 14:02:58', 'Friday'),
(3, '13:00', 'Déjeuner Libre', NULL, 'bg-sky-400', 3, '2026-02-16 15:26:30', '2026-02-22 14:47:09', 'Friday'),
(4, '14:30', 'Projection Débat/IA Difficile', 'Par : Wim Wenders, Paul Verhoeven', 'bg-emerald-400', 4, '2026-02-16 15:26:30', '2026-02-25 14:03:05', 'Friday'),
(5, '16:30', 'Table Ronde : Futurs Distopiales', NULL, 'bg-sky-400', 5, '2026-02-16 15:26:30', '2026-02-22 14:47:09', 'Friday'),
(6, '20:30', 'Grand Prix IA Créative de l\'EDI', NULL, 'bg-emerald-400', 6, '2026-02-16 15:26:30', '2026-02-25 14:03:14', 'Friday'),
(7, '21:30', 'Soirée DJ & VJ : DJ Samantha', NULL, 'bg-sky-400', 7, '2026-02-16 15:26:30', '2026-02-22 14:47:09', 'Friday'),
(8, '10:00', 'Table Ronde : Créateurs & IA', NULL, 'bg-emerald-400', 8, '2026-02-22 14:41:37', '2026-02-25 14:02:47', 'Saturday'),
(9, '12:00', 'Fireside Chat (Membres du Jury)', NULL, 'bg-purple-400', 9, '2026-02-22 14:41:37', '2026-02-22 14:41:37', 'Saturday'),
(10, '13:00', 'Pause', NULL, 'bg-emerald-400', 10, '2026-02-22 14:41:37', '2026-02-25 14:04:13', 'Saturday'),
(11, '14:00', 'Présentation des Projets Sélectionnés', NULL, 'bg-sky-400', 11, '2026-02-22 14:41:37', '2026-02-25 14:04:22', 'Saturday'),
(12, '16:00', 'Keynote Partenaire', NULL, 'bg-emerald-400', 12, '2026-02-22 14:41:37', '2026-02-25 14:04:28', 'Saturday'),
(13, '18:00', 'Remise des Prix', NULL, 'bg-sky-400', 13, '2026-02-22 14:41:37', '2026-02-25 14:05:06', 'Saturday'),
(14, '19:00', 'Soirée de Clôture', NULL, 'bg-emerald-400', 14, '2026-02-22 14:41:37', '2026-02-25 14:07:20', 'Saturday');

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
  `replied_by` int DEFAULT NULL,
  `reply` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `contact_messages`
--

INSERT INTO `contact_messages` (`id`, `name`, `last_name`, `subject`, `email`, `message`, `created_at`, `is_read`, `read_at`, `admin_reply`, `replied_at`, `replied_by`, `reply`) VALUES
(1, 'Ocean', 'Breeze', 'Test formulaire', 'ocean@test.com', 'Ceci est un message de test', '2026-02-04 11:27:48', 1, '2026-02-23 14:06:11', NULL, NULL, NULL, NULL),
(2, 'Biamonti', 'Vanessa', 'why oh why?', 'vanessa.biamonti@gmail.com', 'Hello ya! How are ya ?', '2026-02-04 13:15:19', 1, '2026-02-23 14:06:09', NULL, NULL, NULL, NULL),
(3, 'DIANO', 'Loriana', 'Test', 'loriana.diano@laplateforme.io', 'Salut ! ', '2026-02-23 14:05:45', 1, '2026-02-23 14:06:02', NULL, NULL, NULL, NULL),
(4, 'Loriana', 'DIANO', 'Participation', 'loriana.diano@laplateforme.io', 'Bonjour', '2026-02-25 15:43:13', 1, '2026-02-25 15:43:31', NULL, '2026-02-26 12:57:41', NULL, 'Salut');

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
  `illustration` varchar(255) NOT NULL DEFAULT 'default.jpg',
  `location` varchar(255) DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT (now()),
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change',
  `published` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `title`, `description`, `date`, `length`, `stock`, `illustration`, `location`, `created_at`, `updated_at`, `published`) VALUES
(1, 'Accueil & Café Networking', 'Accueil des participants, café et échanges informels.', '2026-03-27 09:30:00', 60, 999, 'default.jpg', 'La Plateforme', '2026-02-22 14:27:02', '2026-02-22 14:27:02', 1),
(2, 'Conférence d’ouverture : L’IA au service du Cinéma', 'Keynote d’ouverture autour des usages de l’IA dans le cinéma.', '2026-03-27 10:30:00', 90, 300, 'default.jpg', 'Auditorium', '2026-02-22 14:27:02', '2026-02-22 14:27:02', 1),
(3, 'Atelier de montage IA', 'Atelier de montage IA', '2026-06-13 06:05:00', 60, 30, '', 'Salle sucre', '2026-02-25 15:56:01', '2026-02-25 15:56:01', 1);

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
  `display_order` int DEFAULT NULL,
  `question_en` varchar(500) NOT NULL DEFAULT '',
  `answer_en` varchar(500) NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `faq`
--

INSERT INTO `faq` (`id`, `question_fr`, `answer_fr`, `created_at`, `updated_at`, `display_order`, `question_en`, `answer_en`) VALUES
(6, 'Puis-je modifier mes informations personnelles ?', 'Oui, vous pouvez modifier vos informations personnelles depuis votre espace client dans la section \"Mon profil\".', '2026-02-11 09:31:16', '2026-02-11 09:31:16', 5, 'Can I update my personal information?', 'Yes, you can update your personal information from your account dashboard under the \"My Profile\" section.'),
(33, 'Avec quoi puis-je filmer ?', 'Vous pouvez filmer avec un téléphone portable ou une tablette. Vous pouvez également utiliser des accessoires tels qu’un micro, un stabilisateur, des filtres, des objectifs amovibles, etc.', '2026-02-20 13:30:57', '2026-02-20 13:30:57', 1, 'With what can I film?', 'You can film with a mobile phone or a tablet. You can also use accessories such as a microphone, a stabilizer, filters, removable lenses, etc.'),
(34, 'Puis-je utiliser des accessoires ?', 'Oui, vous pouvez utiliser des accessoires tels qu’un micro, un stabilisateur, des filtres, des objectifs amovibles, etc.', '2026-02-20 13:32:00', '2026-02-20 13:32:00', 1, 'Can I use accessories?', 'Yes, you can use accessories such as a microphone, a stabilizer, filters, removable lenses, etc.'),
(35, 'Durée', '1 minute maximum, générique inclus.', '2026-02-20 13:33:08', '2026-02-20 13:33:08', 2, 'Duration', 'Maximum 1 minute, credits included.'),
(36, 'Thème', 'Nous vous invitons à explorer les questions autour d’un futur souhaitable. Réfléchissez à la société, à la technologie, à la culture, à l’éthique et à notre manière d’imaginer un avenir meilleur pour tous et pour la planète. Cela peut inclure nos modes de vie, nos relations humaines, nos interactions avec le monde animal et végétal, ou nos innovations et utopies. Soyez créatif.ve, proposez des films originaux et exprimez librement vos idées pour façonner demain.', '2026-02-20 13:38:23', '2026-02-20 13:38:23', 1, 'Theme', 'We invite you to explore questions surrounding a desirable future. Reflect on society, technology, culture, ethics, and the ways we imagine a better future for everyone and for the planet. This can include our lifestyles, human relationships, interactions with the animal and plant worlds, or our innovations and utopias. Be creative, offer original films, and freely express your ideas for shaping tomorrow.'),
(37, 'Peut-on réaliser un film à plusieurs ?', 'Oui. Le formulaire d’inscription vous permet de citer page 3 tous les membres de votre équipe ainsi que leur fonction, dont les éventuels co-réalisateurs.', '2026-02-20 13:39:49', '2026-02-20 13:39:49', 2, 'Can a film be made by several people?', 'Yes. The registration form allows you to list all team members on page 3, along with their roles, including any co-directors.'),
(38, 'Puis-je proposer plusieurs vidéos à la compétition ?', 'Oui, vous pouvez inscrire gratuitement autant de films que vous le souhaitez. Cependant, un seul film par réalisateur pourra être sélectionné en compétition. Lors de l’inscription de vos films, merci d’utiliser les mêmes pseudo, e-mail et mot de passe.', '2026-02-20 13:41:22', '2026-02-20 13:41:22', 3, 'Can I submit multiple videos to the competition?', 'Yes, you can submit as many films as you like for free. However, only one film per director can be selected for the competition. When registering your films, please use the same username, email, and password.'),
(39, 'Quel(s) type(s) de fichier(s) vidéo acceptez-vous ?', 'Formats .MP4 ou .MOV, 300Mo max.', '2026-02-20 13:43:04', '2026-02-20 13:43:04', 2, 'What type(s) of video files do you accept?', '.MP4 or .MOV formats, up to 300 MB.'),
(40, 'Je n\'ai pas reçu de confirmation de mon inscription', 'Un email de confirmation doit vous parvenir après validation du formulaire en ligne. Cela peut prendre quelques heures. Si vous n’avez toujours rien reçu 24h00 après votre inscription et après avoir vérifié vos spams, merci de contacter notre équipe (info@mobilefilmfestival.com). Nous vous répondrons dès que possible.', '2026-02-20 13:45:39', '2026-02-20 13:45:39', 4, 'I haven’t received a confirmation of my registration', 'A confirmation email should be sent to you after submitting the online form. This may take a few hours. If you still haven’t received anything 24 hours after registering, and after checking your spam folder, please contact our team at info@mobilefilmfestival.com\n. We will get back to you as soon as possible.');

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
  `last_sent_at` datetime DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  `locale` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`id`, `email`, `created_at`, `unsubscribed_at`, `status`, `consent_at`, `confirm_token`, `confirm_expires_at`, `confirmed_at`, `unsubscribe_token`, `last_sent_at`, `country`, `locale`) VALUES
(1, 'loriana.diano@laplateforme.io', '2026-02-23 13:28:11', NULL, 'pending', '2026-02-23 14:28:11', '305adb14babe4f3bf1f1a753d996b8e3963e4fbaabaddc0060b60c88fa6eaad4', '2026-02-24 14:28:11', NULL, '7b2aee77d9b585a824050a62fa2037f1469513fd511d5952763256fc8f27832e', NULL, NULL, 'fr');

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
(10, 'L’Agence du court métrage', '/uploads/logoPartners/1773304644962-acm-logo-2.png', 'https://www.agencecm.com/', '2026-03-12 09:37:24', '2026-03-12 09:37:24');

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
(11, '1770209000793-795423-Capture_d___e__cran_2026-02-04_a___13.20.40.png', 5),
(12, 'grp4/stills/1771933952562-749647-cover1-city.png', 6),
(13, 'grp4/stills/1772030221363-493601-Capture_d___e__cran_2026-02-25_a___15.35.54.png', 7);

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
(2, 'bio', '2026-02-05 11:24:53'),
(0, 'future', '2026-02-24 11:52:41'),
(0, 'city', '2026-02-24 11:52:41'),
(0, 'ville', '2026-02-24 11:52:41'),
(0, 'city', '2026-02-25 14:37:09'),
(0, 'future', '2026-02-25 14:37:09');

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
(5, 'loriana.admin@example.com', '$2b$10$UmN49xJrtFcO8UQ5ZucylOXoJgVoGTcDMsYrVpIWjaHXp/JDLcGFq', 'admin', 'Loriana', 'DIANO', '2026-02-16 12:51:33', '2026-02-16 12:51:33', NULL, NULL),
(6, 'loriana.selector@example.com', '$2b$10$bVoEzpru7EexVi/eEJqQk.x5an99CinDkO/dzkX6jGpMgRGEQs2FC', 'selector', 'Loriana', 'DIANO', '2026-02-24 14:39:40', '2026-02-24 14:39:40', NULL, NULL),
(7, 'loriana.superadmin@example.com', '$2b$10$bVoEzpru7EexVi/eEJqQk.x5an99CinDkO/dzkX6jGpMgRGEQs2FC', 'superadmin', 'Loriana', 'DIANO', '2026-02-25 14:00:23', '2026-02-25 14:00:23', NULL, NULL),
(8, 'loriana.test@example.com', '$2b$10$4OqUeO1SR7nwg6WMDYzZxu1SgtKIEJg35.Q6u21MuOPNAnC1vpNv.', 'admin', 'Loriana', 'DIANO', '2026-02-25 16:12:03', '2026-02-25 16:12:03', NULL, NULL);

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
(5, NULL, '1770209000687-484520-7547566-uhd_3840_2160_25fps.mp4', 'Virtual PC', 'Virtual PC', 'Virtual PC', 'Virtual PC', '1770209000744-255216-Capture_d___e__cran_2026-02-04_a___13.20.40.png', 'fr', 'France', 5, 'Krok', 'Krok', 'Krok', 'loriana.test@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes, 33170 GRADIGNAN', 'France', 'Travail', 'Published', 1, '2026-02-04 13:43:21', 1, '2026-02-04 13:43:21', '2026-02-04 13:43:20', 0),
(6, 'Ej2VMuWdleQ', 'grp4/videos/1771933952451-860903-video5-city.mp4', 'Ville dans le future', 'City in the future', 'Ville dans le future', 'City in the future', 'grp4/covers/1771933952550-899549-cover1-city.png', 'fr', 'France', 5, 'Luma', 'Luma', 'Luma', 'loriana.test2@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes appt 401 bat 4C', 'France', 'Instagram', 'Published', 1, '2026-02-24 12:52:41', 1, '2026-02-24 12:52:41', '2026-02-24 12:52:36', 0),
(7, 'g7SM9PC54WE', 'grp4/videos/1772030221347-569254-viedo1-city.mp4', 'Ville', 'City', 'Ville', 'City', 'grp4/covers/1772030221353-503539-Capture_d___e__cran_2026-02-25_a___15.35.54.png', 'fr', 'France', 5, 'Full IA', 'Luma', 'Full IA', 'loriana.test@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes, 33170 GRADIGNAN', 'France', 'Travail', 'Published', 1, '2026-02-25 15:37:09', 1, '2026-02-25 15:37:09', '2026-02-25 15:37:04', 0);

-- --------------------------------------------------------

--
-- Structure de la table `video_review`
--

CREATE TABLE `video_review` (
  `id` int NOT NULL,
  `video_id` int NOT NULL,
  `user_id` int NOT NULL,
  `rating` tinyint NOT NULL,
  `comment` text,
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ;

--
-- Déchargement des données de la table `video_review`
--

INSERT INTO `video_review` (`id`, `video_id`, `user_id`, `rating`, `comment`, `created_at`, `updated_at`) VALUES
(1, 6, 6, 6, 'Trop belle !', '2026-02-25 09:59:59', '2026-02-25 11:10:29');

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
(5, 5, '1770209000825-731928-1769700659590-516424-soustitre.srt', NULL, '2026-02-04 13:43:20'),
(10, 6, 'grp4/subtitles/1771933952573-238570-1769700659590-516424-soustitre.srt', NULL, '2026-02-24 12:52:41'),
(11, 7, 'grp4/subtitles/1772030221371-482558-1769700659590-516424-soustitre.srt', NULL, '2026-02-25 15:37:09');

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
(12, 2),
(6, 0),
(6, 0),
(6, 0),
(7, 0),
(7, 0),
(7, 0),
(7, 0);

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
-- Index pour la table `newsletters`
--
ALTER TABLE `newsletters`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `newsletter_deliveries`
--
ALTER TABLE `newsletter_deliveries`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
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
-- Index pour la table `video_review`
--
ALTER TABLE `video_review`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uniq_video_user` (`video_id`,`user_id`),
  ADD KEY `idx_video` (`video_id`),
  ADD KEY `idx_user` (`user_id`);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1472;

--
-- AUTO_INCREMENT pour la table `conference_program`
--
ALTER TABLE `conference_program`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT pour la table `contact_messages`
--
ALTER TABLE `contact_messages`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `contributor`
--
ALTER TABLE `contributor`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `faq`
--
ALTER TABLE `faq`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `newsletter_deliveries`
--
ALTER TABLE `newsletter_deliveries`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `parameters`
--
ALTER TABLE `parameters`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `partner`
--
ALTER TABLE `partner`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `social_media`
--
ALTER TABLE `social_media`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `still`
--
ALTER TABLE `still`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `tag`
--
ALTER TABLE `tag`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `video_review`
--
ALTER TABLE `video_review`
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `video_subtitles`
--
ALTER TABLE `video_subtitles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

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
-- Contraintes pour la table `video_review`
--
ALTER TABLE `video_review`
  ADD CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_review_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `video_subtitles`
--
ALTER TABLE `video_subtitles`
  ADD CONSTRAINT `fk_video_subtitles_video` FOREIGN KEY (`video_id`) REFERENCES `videos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
