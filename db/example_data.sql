INSERT INTO `users` (`dni`, `username`, `password`, `name`, `surname`, `email`, `role`) VALUES
('12345678A', 'admin', '$2b$04$3CeHE/SXF4EavVcJeAlnXOaeBWw9uS5frdIlvUuj.nsCYzzS/t.O6', 'Admin', 'Admin', 'admin@gmail.com', 'ADMIN');


INSERT INTO `unit_measures` (`abbreviation`, `full_name`) VALUES
('ud', 'unidad'),
('kg', 'kilogramo'),
('l', 'litro'),
('m', 'metro'),
('m2', 'metro cuadrado'),
('m3', 'metro cúbico');

INSERT INTO `products` (`name`, `description`, `price`, `cost`, `stock`, `unit_measure_id`, `unit_limit`) VALUES
('Manzana', 'Manzanas de todo tipo', 2.00, 1.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
('Pera', 'Peras de todo tipo', 1.50, 0.75, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
('Plátano', 'Plátanos de todo tipo', 3.00, 1.50, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
('Naranja', 'Naranjas de todo tipo', 2.50, 1.25, 125, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 12),
('Uva', 'Uvas de todo tipo', 4.00, 2.00, 150, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 15),
('Fresa', 'Fresas de todo tipo', 5.00, 2.50, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
('Sandía', 'Sandías de todo tipo', 6.00, 3.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
('Melón', 'Melones de todo tipo', 7.00, 3.50, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
('Pimiento', 'Pimientos de todo tipo', 2.00, 1.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
('Tomate', 'Tomates de todo tipo', 1.50, 0.75, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
('Pepino', 'Pepinos de todo tipo', 3.00, 1.50, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
('Lechuga', 'Lechugas de todo tipo', 2.50, 1.25, 125, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 12),
('Espinaca', 'Espinacas de todo tipo', 4.00, 2.00, 150, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 15),
('Coliflor', 'Coliflores de todo tipo', 5.00, 2.50, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
('Brócoli', 'Brócolis de todo tipo', 6.00, 3.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
('Zanahoria', 'Zanahorias de todo tipo', 7.00, 3.50, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
('Patata', 'Patatas de todo tipo', 2.00, 1.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
('Cebolla', 'Cebollas de todo tipo', 1.50, 0.75, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
('Ajo', 'Ajos de todo tipo', 3.00, 1.50, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
('Calabaza', 'Calabazas de todo tipo', 2.50, 1.25, 125, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 12),
('Calabacín', 'Calabacines de todo tipo', 4.00, 2.00, 150, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 15),
('Berenjena', 'Berenjenas de todo tipo', 5.00, 2.50, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
('Champiñón', 'Champiñones de todo tipo', 6.00, 3.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
('Seta', 'Setas de todo tipo', 7.00, 3.50, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7);

INSERT INTO `suppliers` (`name`, `phone`) VALUES
('Frutas y Verduras S.A.', '123456789');

INSERT INTO `supplier_provides_product` VALUES
((select product_id from products where name = 'Manzana'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Pera'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Plátano'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Naranja'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Uva'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Fresa'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Sandía'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Melón'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Pimiento'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Tomate'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Pepino'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Lechuga'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Espinaca'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Coliflor'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Brócoli'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Zanahoria'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Patata'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Cebolla'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Ajo'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Calabaza'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Calabacín'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Berenjena'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Champiñón'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
((select product_id from products where name = 'Seta'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.'));


INSERT INTO `buys` (`date`, `user_id`, `supplier_id`) VALUES
('2023-10-23 19:45:23', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
('2023-10-25 06:32:14', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
('2023-10-28 14:20:19', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
('2023-11-04 14:04:58', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.')),
('2023-11-07 17:05:54', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Frutas y Verduras S.A.'));

INSERT INTO `buy_contains_product` VALUES
((select buy_id from buys where date = '2023-10-23 19:45:23'), (select product_id from products where name = 'Manzana'), 1.00, 100),
((select buy_id from buys where date = '2023-10-23 19:45:23'), (select product_id from products where name = 'Pera'), 0.75, 75),
((select buy_id from buys where date = '2023-10-23 19:45:23'), (select product_id from products where name = 'Plátano'), 1.50, 50),
((select buy_id from buys where date = '2023-10-23 19:45:23'), (select product_id from products where name = 'Naranja'), 1.25, 125),
((select buy_id from buys where date = '2023-10-23 19:45:23'), (select product_id from products where name = 'Uva'), 2.00, 150),
((select buy_id from buys where date = '2023-10-25 06:32:14'), (select product_id from products where name = 'Fresa'), 2.50, 100),
((select buy_id from buys where date = '2023-10-25 06:32:14'), (select product_id from products where name = 'Sandía'), 3.00, 50),
((select buy_id from buys where date = '2023-10-25 06:32:14'), (select product_id from products where name = 'Melón'), 3.50, 75),
((select buy_id from buys where date = '2023-10-25 06:32:14'), (select product_id from products where name = 'Pimiento'), 1.00, 100),
((select buy_id from buys where date = '2023-10-25 06:32:14'), (select product_id from products where name = 'Tomate'), 0.75, 75),
((select buy_id from buys where date = '2023-10-25 06:32:14'), (select product_id from products where name = 'Pepino'), 1.50, 50),
((select buy_id from buys where date = '2023-10-28 14:20:19'), (select product_id from products where name = 'Lechuga'), 1.25, 125),
((select buy_id from buys where date = '2023-10-28 14:20:19'), (select product_id from products where name = 'Espinaca'), 2.00, 150),
((select buy_id from buys where date = '2023-10-28 14:20:19'), (select product_id from products where name = 'Coliflor'), 2.50, 100),
((select buy_id from buys where date = '2023-10-28 14:20:19'), (select product_id from products where name = 'Brócoli'), 3.00, 50),
((select buy_id from buys where date = '2023-10-28 14:20:19'), (select product_id from products where name = 'Zanahoria'), 3.50, 75),
((select buy_id from buys where date = '2023-10-28 14:20:19'), (select product_id from products where name = 'Patata'), 1.00, 100),
((select buy_id from buys where date = '2023-10-28 14:20:19'), (select product_id from products where name = 'Cebolla'), 0.75, 75),
((select buy_id from buys where date = '2023-11-04 14:04:58'), (select product_id from products where name = 'Ajo'), 1.50, 50),
((select buy_id from buys where date = '2023-11-04 14:04:58'), (select product_id from products where name = 'Calabaza'), 1.25, 125),
((select buy_id from buys where date = '2023-11-04 14:04:58'), (select product_id from products where name = 'Calabacín'), 2.00, 150),
((select buy_id from buys where date = '2023-11-04 14:04:58'), (select product_id from products where name = 'Berenjena'), 2.50, 100),
((select buy_id from buys where date = '2023-11-07 17:05:54'), (select product_id from products where name = 'Champiñón'), 3.00, 50),
((select buy_id from buys where date = '2023-11-07 17:05:54'), (select product_id from products where name = 'Seta'), 3.50, 75);

-- Products from Carnicería S.L.
INSERT INTO `products`(`name`, `description`, `price`, `cost`, `stock`, `unit_measure_id`, `unit_limit`) VALUES 
("Carne de vacuno", "Carne de vacuno de origen español", 10.00, 5.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
("Carne de cerdo", "Carne de cerdo de origen español", 8.00, 4.00, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
("Carne de pollo", "Carne de pollo de origen español", 6.00, 3.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
("Carne de cordero", "Carne de cordero de origen suizo", 12.00, 6.00, 125, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 12),
("Carne de conejo", "Carne de conejo de origen español", 14.00, 7.00, 150, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 15),
("Carne de pavo", "Carne de pavo de origen español", 16.00, 8.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
("Carne de pato", "Carne de pato de origen francés", 18.00, 9.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
("Carne de avestruz", "Carne de avestruz de origen australiano", 20.00, 10.00, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
("Carne de caballo", "Carne de caballo de origen peruano", 22.00, 11.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
("Carne de buey", "Carne de buey de origen canadiense", 24.00, 12.00, 125, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 12);

INSERT INTO `suppliers` (`name`, `phone`) VALUES
('Carnicería S.L.', '987654321');

INSERT INTO `supplier_provides_product` VALUES
((select product_id from products where name = 'Carne de vacuno'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de cerdo'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de pollo'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de cordero'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de conejo'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de pavo'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de pato'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de avestruz'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de caballo'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
((select product_id from products where name = 'Carne de buey'), (select supplier_id from suppliers where name = 'Carnicería S.L.'));

INSERT INTO `buys` (`date`, `user_id`, `supplier_id`) VALUES
('2023-10-23 19:45:24', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
('2023-10-25 06:32:15', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
('2023-10-28 14:20:12', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Carnicería S.L.')),
('2023-11-04 14:05:58', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Carnicería S.L.'));

INSERT INTO `buy_contains_product` VALUES
((select buy_id from buys where date = '2023-10-23 19:45:24'), (select product_id from products where name = 'Carne de vacuno'), 5.00, 100),
((select buy_id from buys where date = '2023-10-23 19:45:24'), (select product_id from products where name = 'Carne de cerdo'), 4.00, 75),
((select buy_id from buys where date = '2023-10-23 19:45:24'), (select product_id from products where name = 'Carne de pollo'), 3.00, 50),
((select buy_id from buys where date = '2023-10-25 06:32:15'), (select product_id from products where name = 'Carne de cordero'), 6.00, 125),
((select buy_id from buys where date = '2023-10-25 06:32:15'), (select product_id from products where name = 'Carne de conejo'), 7.00, 150),
((select buy_id from buys where date = '2023-10-28 14:20:12'), (select product_id from products where name = 'Carne de pavo'), 8.00, 100),
((select buy_id from buys where date = '2023-10-28 14:20:12'), (select product_id from products where name = 'Carne de pato'), 9.00, 50),
((select buy_id from buys where date = '2023-10-28 14:20:12'), (select product_id from products where name = 'Carne de avestruz'), 10.00, 75),
((select buy_id from buys where date = '2023-11-04 14:05:58'), (select product_id from products where name = 'Carne de caballo'), 11.00, 100),
((select buy_id from buys where date = '2023-11-04 14:05:58'), (select product_id from products where name = 'Carne de buey'), 12.00, 125);

-- Products from Pescadería S.L.
INSERT INTO `products`(`name`, `description`, `price`, `cost`, `stock`, `unit_measure_id`, `unit_limit`) VALUES
("Bacalao", "Bacalao de origen noruego", 10.00, 5.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
("Salmón", "Salmón de origen noruego", 8.00, 4.00, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
("Atún", "Atún de origen español", 6.00, 3.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
("Merluza", "Merluza de origen español", 12.00, 6.00, 125, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 12),
("Lubina", "Lubina de origen español", 14.00, 7.00, 150, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 15),
("Dorada", "Dorada de origen español", 16.00, 8.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
("Sardina", "Sardina de origen español", 18.00, 9.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 5),
("Boquerón", "Boquerón de origen español", 20.00, 10.00, 75, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 7),
("Anchoa", "Anchoa de origen español", 22.00, 11.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 10),
("Pulpo", "Pulpo de origen español", 24.00, 12.00, 125, (select unit_measure_id from unit_measures where abbreviation = 'kg'), 12);

INSERT INTO `suppliers` (`name`, `phone`) VALUES
('Pescadería S.L.', '123123123');

INSERT INTO `supplier_provides_product` VALUES
((select product_id from products where name = 'Bacalao'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Salmón'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Atún'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Merluza'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Lubina'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Dorada'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Sardina'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Boquerón'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Anchoa'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
((select product_id from products where name = 'Pulpo'), (select supplier_id from suppliers where name = 'Pescadería S.L.'));

INSERT INTO `buys` (`date`, `user_id`, `supplier_id`) VALUES
('2023-10-23 19:45:26', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
('2023-10-25 06:32:16', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
('2023-10-28 14:20:21', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Pescadería S.L.')),
('2023-11-04 14:04:59', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Pescadería S.L.'));

INSERT INTO `buy_contains_product` VALUES
((select buy_id from buys where date = '2023-10-23 19:45:26'), (select product_id from products where name = 'Bacalao'), 5.00, 100),
((select buy_id from buys where date = '2023-10-23 19:45:26'), (select product_id from products where name = 'Salmón'), 4.00, 75),
((select buy_id from buys where date = '2023-10-23 19:45:26'), (select product_id from products where name = 'Atún'), 3.00, 50),
((select buy_id from buys where date = '2023-10-25 06:32:16'), (select product_id from products where name = 'Merluza'), 6.00, 125),
((select buy_id from buys where date = '2023-10-25 06:32:16'), (select product_id from products where name = 'Lubina'), 7.00, 150),
((select buy_id from buys where date = '2023-10-28 14:20:21'), (select product_id from products where name = 'Dorada'), 8.00, 100),
((select buy_id from buys where date = '2023-10-28 14:20:21'), (select product_id from products where name = 'Sardina'), 9.00, 50),
((select buy_id from buys where date = '2023-11-04 14:04:59'), (select product_id from products where name = 'Boquerón'), 10.00, 75),
((select buy_id from buys where date = '2023-11-04 14:04:59'), (select product_id from products where name = 'Anchoa'), 11.00, 100),
((select buy_id from buys where date = '2023-11-04 14:04:59'), (select product_id from products where name = 'Pulpo'), 12.00, 125);


-- Products from Panadería S.L.
INSERT INTO `products`(`name`, `description`, `price`, `cost`, `stock`, `unit_measure_id`, `unit_limit`) VALUES
("Barra de pan artesano", "Barra de pan artesano con masa madre", 1.00, 0.50, 100, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 10),
("Chapata", "Chapata con harina española", 1.50, 0.75, 75, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 7),
("Barra de pan normal", "Barra de pan normal", 2.00, 1.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 5),
("Pan de espelta", "Pan de espelta artesanal", 2.50, 1.25, 125, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 12),
("Pan integral", "Pan integral con masa madre", 3.00, 1.50, 150, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 15),
("Pan de maíz", "Pan de maíz de origen español", 3.50, 1.75, 100, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 10);

INSERT INTO `suppliers` (`name`, `phone`) VALUES
('Panadería S.L.', '456456456');

INSERT INTO `supplier_provides_product` VALUES
((select product_id from products where name = 'Barra de pan artesano'), (select supplier_id from suppliers where name = 'Panadería S.L.')),
((select product_id from products where name = 'Chapata'), (select supplier_id from suppliers where name = 'Panadería S.L.')),
((select product_id from products where name = 'Barra de pan normal'), (select supplier_id from suppliers where name = 'Panadería S.L.')),
((select product_id from products where name = 'Pan de espelta'), (select supplier_id from suppliers where name = 'Panadería S.L.')),
((select product_id from products where name = 'Pan integral'), (select supplier_id from suppliers where name = 'Panadería S.L.')),
((select product_id from products where name = 'Pan de maíz'), (select supplier_id from suppliers where name = 'Panadería S.L.'));

INSERT INTO `buys` (`date`, `user_id`, `supplier_id`) VALUES
('2023-10-23 19:45:13', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Panadería S.L.')),
('2023-10-25 06:33:14', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Panadería S.L.')),
('2023-10-29 14:20:19', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Panadería S.L.')),
('2023-11-04 15:04:58', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Panadería S.L.'));

INSERT INTO `buy_contains_product` VALUES
((select buy_id from buys where date = '2023-10-23 19:45:13'), (select product_id from products where name = 'Barra de pan artesano'), 0.50, 100),
((select buy_id from buys where date = '2023-10-25 06:33:14'), (select product_id from products where name = 'Chapata'), 0.75, 75),
((select buy_id from buys where date = '2023-10-29 14:20:19'), (select product_id from products where name = 'Barra de pan normal'), 1.00, 50),
((select buy_id from buys where date = '2023-10-29 14:20:19'), (select product_id from products where name = 'Pan de espelta'), 1.25, 125),
((select buy_id from buys where date = '2023-11-04 15:04:58'), (select product_id from products where name = 'Pan integral'), 1.50, 150),
((select buy_id from buys where date = '2023-11-04 15:04:58'), (select product_id from products where name = 'Pan de maíz'), 1.75, 100);

-- Products from Droguería S.L.
INSERT INTO `products`(`name`, `description`, `price`, `cost`, `stock`, `unit_measure_id`, `unit_limit`) VALUES
("Detergente", "Detergente para la ropa", 10.00, 5.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 10),
("Suavizante", "Suavizante para la ropa", 8.00, 4.00, 75, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 7),
("Lejía", "Lejía para la ropa", 6.00, 3.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 5),
("Limpiador", "Limpiador para la casa", 12.00, 6.00, 125, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 12),
("Desinfectante", "Desinfectante para la casa", 14.00, 7.00, 150, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 15),
("Ambientador", "Ambientador para la casa", 16.00, 8.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 10),
("Insecticida", "Insecticida para la casa", 18.00, 9.00, 50, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 5),
("Repelente", "Repelente para la casa", 20.00, 10.00, 75, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 7),
("Cera", "Cera para la casa", 22.00, 11.00, 100, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 10),
("Fregasuelos", "Fregasuelos para la casa", 24.00, 12.00, 125, (select unit_measure_id from unit_measures where abbreviation = 'ud'), 12);

INSERT INTO `suppliers` (`name`, `phone`) VALUES
('Droguería S.L.', '789789789');

INSERT INTO `supplier_provides_product` VALUES
((select product_id from products where name = 'Detergente'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Suavizante'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Lejía'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Limpiador'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Desinfectante'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Ambientador'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Insecticida'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Repelente'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Cera'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
((select product_id from products where name = 'Fregasuelos'), (select supplier_id from suppliers where name = 'Droguería S.L.'));

INSERT INTO `buys` (`date`, `user_id`, `supplier_id`) VALUES
('2023-10-23 19:35:23', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Droguería S.L.')),
('2023-10-25 06:31:14', (select user_id from users where dni = '12345678A'), (select supplier_id from suppliers where name = 'Droguería S.L.'));

INSERT INTO `buy_contains_product` VALUES
((select buy_id from buys where date = '2023-10-23 19:35:23'), (select product_id from products where name = 'Detergente'), 5.00, 100),
((select buy_id from buys where date = '2023-10-23 19:35:23'), (select product_id from products where name = 'Suavizante'), 4.00, 75),
((select buy_id from buys where date = '2023-10-23 19:35:23'), (select product_id from products where name = 'Lejía'), 3.00, 50),
((select buy_id from buys where date = '2023-10-25 06:31:14'), (select product_id from products where name = 'Limpiador'), 6.00, 125),
((select buy_id from buys where date = '2023-10-25 06:31:14'), (select product_id from products where name = 'Desinfectante'), 7.00, 150),
((select buy_id from buys where date = '2023-10-25 06:31:14'), (select product_id from products where name = 'Ambientador'), 8.00, 100),
((select buy_id from buys where date = '2023-10-25 06:31:14'), (select product_id from products where name = 'Insecticida'), 9.00, 50),
((select buy_id from buys where date = '2023-10-25 06:31:14'), (select product_id from products where name = 'Repelente'), 10.00, 75),
((select buy_id from buys where date = '2023-10-25 06:31:14'), (select product_id from products where name = 'Cera'), 11.00, 100),
((select buy_id from buys where date = '2023-10-25 06:31:14'), (select product_id from products where name = 'Fregasuelos'), 12.00, 125);