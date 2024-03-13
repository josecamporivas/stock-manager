DROP DATABASE IF EXISTS `stock_manager`;

CREATE DATABASE IF NOT EXISTS `stock_manager`;

USE `stock_manager`;

-- Table structure for table `USERS`
CREATE TABLE `users` (
  `user_id` int unsigned NOT NULL PRIMARY KEY AUTO_INCREMENT,
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
  `unit_meassure_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `abbreviation` varchar(20) NOT NULL,
  `full_name` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `PRODUCTS`
CREATE TABLE `products` (
  `product_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `stock` int unsigned NOT NULL,
  `unit_measure_id` int unsigned NOT NULL,
  `unit_limit` smallint unsigned NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  FOREIGN KEY (`unit_measure_id`) REFERENCES `units_measures`(`unit_meassure_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `CLIENTS`
CREATE TABLE `clients` (
  `client_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL UNIQUE,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `INVOICES`
CREATE TABLE `invoices` (
  `invoice_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` datetime NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int unsigned NOT NULL,
  `client_id` int unsigned, -- NULLABLE FOREIGN KEY
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
  FOREIGN KEY (`client_id`) REFERENCES `clients`(`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `INVOICE LINES`
CREATE TABLE `invoice_lines` (
  `invoice_id` int unsigned NOT NULL,
  `line_number` int unsigned NOT NULL,
  `amount` int unsigned NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `product_id` int unsigned NOT NULL,
  PRIMARY KEY (`invoice_id`, `line_number`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`),
  FOREIGN KEY (`invoice_id`) REFERENCES `invoices`(`invoice_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `NOTIFICATIONS`
CREATE TABLE `notifications` (
  `notification_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` datetime NOT NULL,
  `message` varchar(255) NOT NULL,
  `product_id` int unsigned NOT NULL,
  `user_id` int unsigned,
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`),
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `SUPPLIERS`
CREATE TABLE `suppliers` (
  `supplier_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `name` varchar(50) NOT NULL,
  `phone` varchar(15) NOT NULL UNIQUE,
  `disabled` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `PROVIDES`
CREATE TABLE `supplier_provides_product` (
  `product_id` int unsigned NOT NULL,
  `supplier_id` int unsigned NOT NULL,
  PRIMARY KEY (`product_id`, `supplier_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`),
  FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `BUYS`
CREATE TABLE `buys` (
  `buy_id` int unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `date` datetime NOT NULL,
  `disabled` tinyint(1) NOT NULL DEFAULT 0,
  `user_id` int unsigned NOT NULL,
  `supplier_id` int unsigned NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`user_id`),
  FOREIGN KEY (`supplier_id`) REFERENCES `suppliers`(`supplier_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Table structure for table `CONTAINS`
CREATE TABLE `buy_contains_product` (
  `buy_id` int unsigned NOT NULL,
  `product_id` int unsigned NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `amount` int unsigned NOT NULL,
  PRIMARY KEY (`buy_id`, `product_id`),
  FOREIGN KEY (`buy_id`) REFERENCES `buys`(`buy_id`),
  FOREIGN KEY (`product_id`) REFERENCES `products`(`product_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;