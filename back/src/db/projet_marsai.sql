-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : jeu. 05 fév. 2026 à 15:36
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
(3, 'home', 'hero', 'protocol', 'fr', 'text', 'le protocole temporel 2026', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(4, 'home', 'hero', 'tagline_before', 'fr', 'text', 'Imaginez des', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(5, 'home', 'hero', 'tagline_highlight', 'fr', 'text', 'Futurs', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(6, 'home', 'hero', 'tagline_after', 'fr', 'text', 'souhaitables', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(7, 'home', 'hero', 'desc1', 'fr', 'text', 'Le festival de courts-métrages de 60 secondes réalisés par IA.', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(8, 'home', 'hero', 'desc2', 'fr', 'text', '2 jours d\'immersion au cœur de Marseille.', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(9, 'home', 'hero', 'ctaParticipate', 'fr', 'text', 'Participer', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(10, 'home', 'hero', 'ctaLearnMore', 'fr', 'text', 'En savoir plus', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(11, 'home', 'hero', 'protocol', 'en', 'text', 'the 2026 temporal protocol', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(12, 'home', 'hero', 'tagline_before', 'en', 'text', 'Imagine', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(13, 'home', 'hero', 'tagline_highlight', 'en', 'text', 'Futures', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(14, 'home', 'hero', 'tagline_after', 'en', 'text', 'worth imagining', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(15, 'home', 'hero', 'desc1', 'en', 'text', 'the 60-second short film festival', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(16, 'home', 'hero', 'desc2', 'en', 'text', '2 days of immersion in the heart of Marseille.', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(17, 'home', 'hero', 'ctaParticipate', 'en', 'text', 'Participate', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(18, 'home', 'hero', 'ctaLearnMore', 'en', 'text', 'Learn more', 0, 1, '2026-02-05 16:28:47', '2026-02-05 16:28:47'),
(19, 'home', 'hero', 'title_main', 'fr', 'text', 'MARS', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(20, 'home', 'hero', 'title_accent', 'fr', 'text', 'AI', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(21, 'home', 'hero', 'title_main', 'en', 'text', 'MARS', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23'),
(22, 'home', 'hero', 'title_accent', 'en', 'text', 'AI', 0, 1, '2026-02-05 16:32:23', '2026-02-05 16:32:23');

--
-- Index pour les tables déchargées
--

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
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `cms`
--
ALTER TABLE `cms`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
