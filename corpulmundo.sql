-- phpMyAdmin SQL Dump
-- version 5.1.1deb5ubuntu1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost:3306
-- Tiempo de generación: 11-08-2023 a las 16:30:05
-- Versión del servidor: 8.0.32-0ubuntu0.22.04.2
-- Versión de PHP: 8.1.2-1ubuntu2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `corpulmundo`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `asociados`
--

CREATE TABLE `asociados` (
  `id` int NOT NULL,
  `apellidos` varchar(90) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `nombres` varchar(90) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `identificacion` varchar(30) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `contacto` varchar(30) COLLATE utf8mb3_spanish2_ci NOT NULL,
  `fechaAdd` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `fechaAfiliado` date NOT NULL,
  `estado` varchar(15) COLLATE utf8mb3_spanish2_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

--
-- Volcado de datos para la tabla `asociados`
--

INSERT INTO `asociados` (`id`, `apellidos`, `nombres`, `identificacion`, `contacto`, `fechaAdd`, `fechaAfiliado`, `estado`) VALUES
(1, '1', '2', '3', '4', '2023-08-02 02:04:07', '2023-08-02', 'ACTIVO'),
(2, '1', '2', '3', '4', '2023-08-02 02:04:08', '2023-08-02', 'ACTIVO'),
(3, '1', '2', '3', '4', '2023-08-02 02:04:09', '2023-08-02', 'ACTIVO'),
(4, '1', '2', '3', '4', '2023-08-02 02:04:09', '2023-08-02', 'ACTIVO'),
(5, '1', '2', '3', '4', '2023-08-02 02:04:09', '2023-08-02', 'ACTIVO'),
(6, '1', '2', '3', '4', '2023-08-02 02:04:10', '2023-08-02', 'ACTIVO'),
(7, '1', '2', '3', '4', '2023-08-02 02:04:10', '2023-08-02', 'ACTIVO'),
(8, '1', '2', '3', '4', '2023-08-02 02:05:19', '2023-08-10', 'ACTIVO'),
(9, 'DAV', 'ASDA', '12312312', 'A', '2023-08-04 00:32:18', '2023-08-26', 'ACTIVO'),
(10, 'TEST', 'TEST', '212121', 'TEST', '2023-08-04 01:22:01', '2023-08-04', 'ACTIVO');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `novedades`
--

CREATE TABLE `novedades` (
  `idNov` int NOT NULL,
  `idAsoc` int NOT NULL,
  `tipo` int NOT NULL,
  `descripcion` json NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_spanish2_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `asociados`
--
ALTER TABLE `asociados`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD PRIMARY KEY (`idNov`),
  ADD KEY `idAsoc` (`idAsoc`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `asociados`
--
ALTER TABLE `asociados`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `novedades`
--
ALTER TABLE `novedades`
  MODIFY `idNov` int NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `novedades`
--
ALTER TABLE `novedades`
  ADD CONSTRAINT `novedades_ibfk_1` FOREIGN KEY (`idAsoc`) REFERENCES `asociados` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
