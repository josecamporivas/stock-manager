DROP DATABASE IF EXISTS `stock_manager`;

CREATE DATABASE IF NOT EXISTS `stock_manager`;

USE `stock_manager`;

-- Table structure for table `USERS`
CREATE TABLE `users` (
  `id` int unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `dni` varchar(9) NOT NULL UNIQUE,
  `username` varchar(50) NOT NULL UNIQUE,
  `password` varchar(150) NOT NULL,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL UNIQUE,
  `role` varchar(25) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `UNITS MEASURES`
CREATE TABLE `units_measures` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `abbreviation` varchar(20) NOT NULL,
  `full_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `PRODUCTS`
CREATE TABLE `products` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `stock` smallint unsigned NOT NULL,
  `unit_measure_id` int unsigned NOT NULL,
  `unit_limit` smallint unsigned NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (`unit_measure_id`) REFERENCES `units_measures`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `CLIENTS`
CREATE TABLE `clients` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL UNIQUE,
  `company` varchar(50),
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `SALES`
CREATE TABLE `sales` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` datetime NOT NULL,
  `amount` smallint unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `product_id` int unsigned NOT NULL,
  `user_dni` varchar(9) NOT NULL,
  `client_id` int unsigned, -- NULLABLE FOREIGN KEY, BUT I'M NOT SURE
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`),
  FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `SUPPLIERS` (SAME TABLE AS CLIENTS)
CREATE TABLE `suppliers` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL UNIQUE,
  `company` varchar(50),
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `BUYS` (SAME TABLE AS SALES)
CREATE TABLE `buys` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` datetime NOT NULL,
  `amount` smallint unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `product_id` int unsigned NOT NULL,
  `user_dni` varchar(9) NOT NULL,
  `supplier_id` int unsigned,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`),
  FOREIGN KEY (`user_dni`) REFERENCES `users`(`dni`),
  FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `NOTIFICATIONS`
CREATE TABLE `notifications` (
  `id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` datetime NOT NULL,
  `message` varchar(255) NOT NULL,
  `product_id` int unsigned NOT NULL,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
