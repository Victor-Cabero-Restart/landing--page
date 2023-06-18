-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:3306
-- Généré le : dim. 18 juin 2023 à 15:17
-- Version du serveur : 8.0.30
-- Version de PHP : 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `twitter`
--

-- --------------------------------------------------------

--
-- Structure de la table `tweet`
--

CREATE TABLE `tweet` (
  `id` int NOT NULL,
  `texte` text COLLATE utf8mb4_general_ci NOT NULL,
  `publish_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `tweet`
--

INSERT INTO `tweet` (`id`, `texte`, `publish_date`) VALUES
(10, 'je tweet', '2023-05-06 15:42:28'),
(22, 'j\'écris un tweet', '2023-05-07 20:14:55'),
(55, 'test', '2023-06-11 20:12:10'),
(62, 'je tweet', '2023-06-18 11:22:30'),
(71, 'test', '2023-06-18 15:05:37'),
(73, 'on essaye d\'en faire un plus long, il est lent ce lait', '2023-06-18 15:28:25');

-- --------------------------------------------------------

--
-- Structure de la table `twittos`
--

CREATE TABLE `twittos` (
  `id` int NOT NULL,
  `nom` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `mail` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `mdp` varchar(100) COLLATE utf8mb4_general_ci NOT NULL,
  `pseudo` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `photo` text COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `twittos`
--

INSERT INTO `twittos` (`id`, `nom`, `mail`, `mdp`, `pseudo`, `photo`) VALUES
(1, 'vico', 'vicoo@gmail.com', 'motdepasse', 'viiicoo', 'https://fastly.picsum.photos/id/139/200/300.jpg?hmac=LFfuwfbYa2mo__RoCuyS9ujrwnHgF5c4AXDiCs3JNZ0'),
(2, 'test', 'test@gmail.com', 'fgshwdjht', 'testeee', 'https://fastly.picsum.photos/id/481/200/300.jpg?hmac=mlbIyGYg8TMyId9tAwMZz1VppVzNObkpL0cVVxnjTVo'),
(12, 'victor', 'vico@gmail.com', 'mdp1234', 'vico', 'https://fastly.picsum.photos/id/481/200/300.jpg?hmac=mlbIyGYg8TMyId9tAwMZz1VppVzNObkpL0cVVxnjTVo');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `tweet`
--
ALTER TABLE `tweet`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `twittos`
--
ALTER TABLE `twittos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `tweet`
--
ALTER TABLE `tweet`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT pour la table `twittos`
--
ALTER TABLE `twittos`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
