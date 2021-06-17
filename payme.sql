-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 17, 2021 at 03:25 AM
-- Server version: 10.4.19-MariaDB
-- PHP Version: 8.0.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `payme`
--

-- --------------------------------------------------------

--
-- Table structure for table `balance`
--

CREATE TABLE `balance` (
  `balance_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `balance` int(11) NOT NULL,
  `balance_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `balance_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `balance`
--

INSERT INTO `balance` (`balance_id`, `user_id`, `balance`, `balance_created_at`, `balance_updated_at`) VALUES
(1, 16, 1610201, '2021-06-16 00:42:59', '2021-06-16 00:42:59'),
(2, 20, 100000, '2021-06-16 23:54:48', '2021-06-16 23:54:48');

-- --------------------------------------------------------

--
-- Table structure for table `transaction`
--

CREATE TABLE `transaction` (
  `transaction_id` int(11) NOT NULL,
  `sender_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `transaction_amount` int(11) NOT NULL,
  `transaction_notes` varchar(256) NOT NULL,
  `transaction_type` varchar(32) NOT NULL,
  `transaction_status` varchar(32) NOT NULL,
  `transaction_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `transaction_updated_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `user_email` varchar(64) NOT NULL,
  `user_password` varchar(256) NOT NULL,
  `user_pin` varchar(256) DEFAULT NULL,
  `user_phone` varchar(64) NOT NULL,
  `user_name` varchar(128) NOT NULL,
  `user_image` varchar(128) DEFAULT NULL,
  `user_verified` tinyint(4) NOT NULL DEFAULT 0,
  `user_created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_updated_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `user_otp` varchar(8) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `user_email`, `user_password`, `user_pin`, `user_phone`, `user_name`, `user_image`, `user_verified`, `user_created_at`, `user_updated_at`, `user_otp`) VALUES
(19, 'mj12345@gmail.com', '$2b$10$QooXe3Ijrdb/TSv7LbqUVuaOI27wO42J4s6JFskX1/AG7POdzG2K6', '$2b$10$XVyL9pYno7eiYVuZ/fs9SO56X17nLCgYCYUbPpj5k.4dQry6RqcBC', '0812398765', 'Michael Jackson', NULL, 0, '2021-06-16 16:20:05', '2021-06-16 17:27:17', '0'),
(20, 'simba@fountain.com', '$2b$10$8Kcuw3OZww/v.JUTCR6bbeJJGPNogz2OfNNoo2n89Y319I8cGIzX6', '$2b$10$hP8wnVI7Z/ESNgg8.qXKXuYutZ28UrXA0F.IEOd7IStsOPvvflzL.', '081283679774', 'Sadio Mane', '2021-06-17T00-59-17.430ZCgBR2Q1WIAAMiE1.jpg', 0, '2021-06-16 23:54:47', '2021-06-17 00:59:17', '0');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`balance_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `balance`
--
ALTER TABLE `balance`
  MODIFY `balance_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
