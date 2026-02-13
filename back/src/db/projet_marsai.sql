-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : ven. 13 fév. 2026 à 12:47
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
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
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
(25, 'home', 'hero', 'ctaParticipate_signe', 'fr', 'image', '/uploads/icons/1770724180233-arrowRight.svg', 9, 1, '2026-02-09 10:41:35', '2026-02-11 10:02:40'),
(26, 'home', 'hero', 'ctaParticipate_signe', 'en', 'image', '	\r\n/uploads/icons/1770724180233-arrowRight.svg', 0, 1, '2026-02-09 10:41:35', '2026-02-11 10:02:27'),
(27, 'home', 'hero', 'protocol_icon', 'fr', 'image', '/uploads/icons/1770724905062-star.png', 1, 1, '2026-02-10 11:59:41', '2026-02-10 13:01:45'),
(32, 'home', 'hero', 'protocol_icon', 'en', 'image', '/uploads/icons/1770724905062-star.png', 0, 1, '2026-02-10 12:53:13', '2026-02-11 09:27:44'),
(33, 'home', 'concept', 'title_main', 'fr', 'text', 'Concept du festival MARSAI', 0, 0, '2026-02-10 14:11:53', '2026-02-11 14:08:24'),
(34, 'home', 'concept', 'card1_title', 'fr', 'text', '1 minute', 1, 1, '2026-02-10 14:11:53', '2026-02-11 14:29:39'),
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
(50, 'home', 'concept', 'card4_description', 'en', 'text', 'World leaders in generative AI.', 8, 1, '2026-02-10 14:12:48', '2026-02-10 14:12:48'),
(51, 'home', 'award', 'eyebrow', 'en', 'text', 'The MARS.AI Project', 0, 1, '2026-02-12 10:34:02', '2026-02-12 10:34:02'),
(52, 'home', 'award', 'title1', 'en', 'text', 'Films in', 1, 1, '2026-02-12 10:34:02', '2026-02-12 10:34:02'),
(53, 'home', 'award', 'title2', 'en', 'text', 'Competition', 2, 1, '2026-02-12 10:34:02', '2026-02-12 10:34:02'),
(54, 'home', 'award', 'description', 'en', 'text', 'Discover a selection of pioneering works exploring new frontiers of AI-assisted imagination.', 3, 1, '2026-02-12 10:34:02', '2026-02-12 10:34:02'),
(55, 'home', 'award', 'ctaSeeMore', 'en', 'text', 'View the selection', 4, 1, '2026-02-12 10:34:02', '2026-02-12 10:34:02'),
(56, 'home', 'award', 'eyebrow', 'fr', 'text', 'le projet MARS.A.I.', 0, 1, '2026-02-12 10:34:16', '2026-02-12 11:06:29'),
(57, 'home', 'award', 'title1', 'fr', 'text', 'Films en', 1, 1, '2026-02-12 10:34:16', '2026-02-12 10:34:16'),
(58, 'home', 'award', 'title2', 'fr', 'text', 'Compétition', 2, 1, '2026-02-12 10:34:16', '2026-02-12 10:34:16'),
(59, 'home', 'award', 'description', 'fr', 'text', 'Découvrez une sélection d’œuvres pionnières explorant de nouvelles frontières de l’imaginaire assisté par IA.', 3, 1, '2026-02-12 10:34:16', '2026-02-12 10:34:16'),
(60, 'home', 'award', 'ctaSeeMore', 'fr', 'text', 'Voir la sélection', 0, 1, '2026-02-12 10:34:16', '2026-02-12 11:14:03'),
(61, 'home', 'award', 'ctaSeeMore_link', 'fr', 'text', '/gallery', 5, 1, '2026-02-12 11:31:57', '2026-02-12 11:31:57'),
(62, 'home', 'award', 'ctaSeeMore_link', 'en', 'text', '/gallery', 5, 1, '2026-02-12 11:31:57', '2026-02-12 11:31:57'),
(63, 'home', 'goal', 'title_main', 'fr', 'text', 'Objectifs du', 0, 1, '2026-02-12 13:30:45', '2026-02-12 14:40:12'),
(64, 'home', 'goal', 'title_accent', 'fr', 'text', 'festival', 1, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(65, 'home', 'goal', 'card1_title', 'fr', 'text', 'L\'humain au centre', 2, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(66, 'home', 'goal', 'card1_description', 'fr', 'text', 'Mettre l\'humain au coeur de la création pour ne pas perdre l\'émotion.', 3, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(67, 'home', 'goal', 'card1_icon', 'fr', 'image', '/uploads/icons/1770901742963-IconTarget.svg', 4, 1, '2026-02-12 13:30:45', '2026-02-12 14:09:02'),
(68, 'home', 'goal', 'card2_title', 'fr', 'text', 'Challenge créatif', 5, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(69, 'home', 'goal', 'card2_description', 'fr', 'text', 'Challenger la créativité grâce à un format ultra court de 60s.', 6, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(70, 'home', 'goal', 'card2_icon', 'fr', 'image', '/uploads/icons/1770901742987-IconLightning.svg', 7, 1, '2026-02-12 13:30:45', '2026-02-12 14:09:02'),
(71, 'home', 'goal', 'card3_title', 'fr', 'text', 'Futurs souhaitables', 8, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(72, 'home', 'goal', 'card3_description', 'fr', 'text', 'Explorer les futurs désirables via les technologies émergentes.', 9, 1, '2026-02-12 13:30:45', '2026-02-12 13:30:45'),
(73, 'home', 'goal', 'card3_icon', 'fr', 'image', '/uploads/icons/1770901742995-IconRocket.svg', 10, 1, '2026-02-12 13:30:45', '2026-02-12 14:09:02'),
(74, 'home', 'goal', 'title_main', 'en', 'text', 'Goals of the', 0, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(75, 'home', 'goal', 'title_accent', 'en', 'text', 'festival', 1, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(76, 'home', 'goal', 'card1_title', 'en', 'text', 'People first', 2, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(77, 'home', 'goal', 'card1_description', 'en', 'text', 'Putting humans at the heart of creation so emotion is never lost.', 3, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(78, 'home', 'goal', 'card1_icon', 'en', 'image', '/src/assets/imgs/icones/IconTarget.svg', 4, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(79, 'home', 'goal', 'card2_title', 'en', 'text', 'Creative challenge', 5, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(80, 'home', 'goal', 'card2_description', 'en', 'text', 'Challenge creativity with an ultra-short 60s format.', 6, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(81, 'home', 'goal', 'card2_icon', 'en', 'image', '/src/assets/imgs/icones/IconLightning.svg', 7, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(82, 'home', 'goal', 'card3_title', 'en', 'text', 'Desirable futures', 8, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(83, 'home', 'goal', 'card3_description', 'en', 'text', 'Explore desirable futures through emerging technologies.', 9, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(84, 'home', 'goal', 'card3_icon', 'en', 'image', '/src/assets/imgs/icones/IconRocket.svg', 10, 1, '2026-02-12 13:31:01', '2026-02-12 13:31:01'),
(85, 'home', 'concept', 'card1_title_color', 'fr', 'text', '#C27AFF', 3, 1, '2026-02-13 10:14:41', '2026-02-13 11:59:11'),
(86, 'home', 'concept', 'card2_title_color', 'fr', 'text', '#00D492', 6, 1, '2026-02-13 10:14:41', '2026-02-13 11:59:11'),
(87, 'home', 'concept', 'card3_title_color', 'fr', 'text', '#FB64B6', 9, 1, '2026-02-13 10:14:41', '2026-02-13 11:59:11'),
(88, 'home', 'concept', 'card4_title_color', 'fr', 'text', '#2B7FFF', 12, 1, '2026-02-13 10:14:41', '2026-02-13 11:59:11'),
(89, 'home', 'concept', 'card1_title_color', 'en', 'text', '#A855F7', 100, 1, '2026-02-13 10:14:41', '2026-02-13 11:13:52'),
(90, 'home', 'concept', 'card2_title_color', 'en', 'text', '#10B981', 101, 1, '2026-02-13 10:14:41', '2026-02-13 11:13:52'),
(91, 'home', 'concept', 'card3_title_color', 'en', 'text', '#EC4899', 102, 1, '2026-02-13 10:14:41', '2026-02-13 11:13:52'),
(92, 'home', 'concept', 'card4_title_color', 'en', 'text', '#3B82F6', 103, 1, '2026-02-13 10:14:41', '2026-02-13 11:13:52');

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
  `created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
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
  `updated_at` datetime NOT NULL DEFAULT (now()) COMMENT 'auto-update on row change'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

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
(1, 'MarsAI — Newsletter #1', 'Bienvenue', '{\"blocks\": [{\"text\": \"Hello MarsAI\", \"type\": \"h1\"}, {\"text\": \"Ceci est un test de newsletter.\", \"type\": \"p\"}, {\"type\": \"divider\"}]}', '#ffffff', 'sent', NULL, '2026-02-10 14:02:45', '2026-02-10 12:04:10', '2026-02-10 14:02:45'),
(1, 'MarsAI — Newsletter #1', 'Bienvenue', '{\"blocks\": [{\"text\": \"Hello MarsAI\", \"type\": \"h1\"}, {\"text\": \"Ceci est un test de newsletter.\", \"type\": \"p\"}, {\"type\": \"divider\"}]}', '#ffffff', 'sent', NULL, '2026-02-10 14:02:45', '2026-02-10 12:04:10', '2026-02-10 14:02:45'),
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
(1, 'test123@gmail.com', '2026-02-05 13:33:17', NULL, 'pending', NULL, NULL, NULL, NULL, NULL, NULL),
(2, 'toi@example.com', '2026-02-10 08:59:35', NULL, 'active', '2026-02-10 10:59:36', NULL, NULL, '2026-02-10 11:05:12', '0ab5de47b16b20d460ba9a99f86e5672d969e30ef9a4a9bdb0b72186eafcd6ed', NULL),
(3, 'moi@example.com', '2026-02-10 09:05:33', NULL, 'active', '2026-02-10 11:14:22', 'f3856310a1873b7bac740c6d92d54a40a630abe91124acd6800f882e40624800', '2026-02-11 11:14:22', '2026-02-10 11:05:43', 'c751c178fb86aca2b68e0b0c3cf473dfa4fac4d2a9cf21a221781a65a7a112e6', NULL);

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
(5, NULL, '1770209000687-484520-7547566-uhd_3840_2160_25fps.mp4', 'Virtual PC', 'Virtual PC', 'Virtual PC', 'Virtual PC', '1770209000744-255216-Capture_d___e__cran_2026-02-04_a___13.20.40.png', 'fr', 'France', 5, 'Krok', 'Krok', 'Krok', 'loriana.test@example.com', 'Loriana', 'DIANO', 'Mrs', '1992-07-08', '0630393432', NULL, 'Residence Barthes, 33170 GRADIGNAN', 'France', 'Travail', 'Pending', 1, '2026-02-04 13:43:21', 1, '2026-02-04 13:43:21', '2026-02-04 13:43:20', 0);

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
(10, 2);

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=93;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `video_subtitles`
--
ALTER TABLE `video_subtitles`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

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
