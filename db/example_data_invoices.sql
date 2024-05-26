INSERT INTO `clients` (`name`, `phone`) VALUES
('Pablo Antonio', '564123543'),
('Carlos Enrique', '564123544');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-01-01 13:24:00', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Pablo Antonio"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-01-01 13:24:00'), 1, 2, 2.00, (SELECT product_id FROM products WHERE name = "Manzana")),
((SELECT invoice_id FROM invoices WHERE date = '2023-01-01 13:24:00'), 2, 3, 4.00, (SELECT product_id FROM products WHERE name = "Uva")),
((SELECT invoice_id FROM invoices WHERE date = '2023-01-01 13:24:00'), 3, 1.5, 2.50, (SELECT product_id FROM products WHERE name = "Lechuga"));

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-02-02 04:10:40', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Carlos Enrique"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-02-02 04:10:40'), 1, 1, 10.00, (SELECT product_id FROM products WHERE name = "Carne de vacuno")),
((SELECT invoice_id FROM invoices WHERE date = '2023-02-02 04:10:40'), 2, 1, 18.00, (SELECT product_id FROM products WHERE name = "Carne de pato"));

INSERT INTO `clients` (`name`, `phone`) VALUES
('Jose Maria', '235123546'),
('Carlota', '234123547');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-03-03 13:24:00', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Jose Maria"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-03-03 13:24:00'), 1, 2, 2.00, (SELECT product_id FROM products WHERE name = "Manzana")),
((SELECT invoice_id FROM invoices WHERE date = '2023-03-03 13:24:00'), 2, 1, 4.00, (SELECT product_id FROM products WHERE name = "Uva")),
((SELECT invoice_id FROM invoices WHERE date = '2023-03-03 13:24:00'), 3, 0.5, 2.50, (SELECT product_id FROM products WHERE name = "Lechuga"));

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-04-04 04:10:40', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Carlota"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-04-04 04:10:40'), 1, 1, 10.00, (SELECT product_id FROM products WHERE name = "Carne de vacuno")),
((SELECT invoice_id FROM invoices WHERE date = '2023-04-04 04:10:40'), 2, 0.5, 18.00, (SELECT product_id FROM products WHERE name = "Carne de pato"));


INSERT INTO `clients` (`name`, `phone`) VALUES
('Marcos Garcia', '123456789'),
('Pepe Gomez', '987654321');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-05-12 13:24:00', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Marcos Garcia"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-05-12 13:24:00'), 1, 2, 2.00, (SELECT product_id FROM products WHERE name = "Manzana")),
((SELECT invoice_id FROM invoices WHERE date = '2023-05-12 13:24:00'), 2, 3, 4.00, (SELECT product_id FROM products WHERE name = "Uva")),
((SELECT invoice_id FROM invoices WHERE date = '2023-05-12 13:24:00'), 3, 1.5, 2.50, (SELECT product_id FROM products WHERE name = "Lechuga"));

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-06-13 04:10:40', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Pepe Gomez"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-06-13 04:10:40'), 1, 1, 10.00, (SELECT product_id FROM products WHERE name = "Carne de vacuno")),
((SELECT invoice_id FROM invoices WHERE date = '2023-06-13 04:10:40'), 2, 1, 18.00, (SELECT product_id FROM products WHERE name = "Carne de pato")),
((SELECT invoice_id FROM invoices WHERE date = '2023-06-13 04:10:40'), 3, 0.5, 22.00, (SELECT product_id FROM products WHERE name = "Carne de caballo"));

INSERT INTO `clients` (`name`, `phone`) VALUES
('Laura', '986327654'),
('Carlos', '987654322');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-07-14 10:10:10', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Laura"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-07-14 10:10:10'), 1, 1, 10.00, (SELECT product_id FROM products WHERE name = "Patata")),
((SELECT invoice_id FROM invoices WHERE date = '2023-07-14 10:10:10'), 2, 1, 5.00, (SELECT product_id FROM products WHERE name = "Berenjena")),
((SELECT invoice_id FROM invoices WHERE date = '2023-07-14 10:10:10'), 3, 0.5, 24.00, (SELECT product_id FROM products WHERE name = "Carne de buey"));

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-08-15 13:12:10', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Carlos"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-08-15 13:12:10'), 1, 1, 14.00, (SELECT product_id FROM products WHERE name = "Carne de conejo")),
((SELECT invoice_id FROM invoices WHERE date = '2023-08-15 13:12:10'), 2, 1, 12.00, (SELECT product_id FROM products WHERE name = "Merluza")),
((SELECT invoice_id FROM invoices WHERE date = '2023-08-15 13:12:10'), 3, 0.5, 20.00, (SELECT product_id FROM products WHERE name = "Boquerón"));

INSERT INTO `clients` (`name`, `phone`) VALUES
('Fernanda', '123456788'),
('Pablo', '987654323');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-09-16 13:24:00', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Fernanda"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-09-16 13:24:00'), 1, 2, 2.50, (SELECT product_id FROM products WHERE name = "Pan de espelta")),
((SELECT invoice_id FROM invoices WHERE date = '2023-09-16 13:24:00'), 2, 1, 3.50, (SELECT product_id FROM products WHERE name = "Pan de maíz")),
((SELECT invoice_id FROM invoices WHERE date = '2023-09-16 13:24:00'), 3, 1, 8.00, (SELECT product_id FROM products WHERE name = "Suavizante"));

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-10-17 04:10:40', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Pablo"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-10-17 04:10:40'), 1, 3, 16.00, (SELECT product_id FROM products WHERE name = "Ambientador")),
((SELECT invoice_id FROM invoices WHERE date = '2023-10-17 04:10:40'), 2, 2, 18.00, (SELECT product_id FROM products WHERE name = "Insecticida")),
((SELECT invoice_id FROM invoices WHERE date = '2023-10-17 04:10:40'), 3, 4, 24.00, (SELECT product_id FROM products WHERE name = "Fregasuelos"));

INSERT INTO `clients` (`name`, `phone`) VALUES
('Sara', '123456787'),
('Luis', '987654324');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-11-18 13:24:00', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Sara"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-11-18 13:24:00'), 1, 2, 2.00, (SELECT product_id FROM products WHERE name = "Manzana")),
((SELECT invoice_id FROM invoices WHERE date = '2023-11-18 13:24:00'), 2, 1, 4.00, (SELECT product_id FROM products WHERE name = "Uva")),
((SELECT invoice_id FROM invoices WHERE date = '2023-11-18 13:24:00'), 3, 0.5, 2.50, (SELECT product_id FROM products WHERE name = "Lechuga"));

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2023-12-19 04:10:40', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Luis"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2023-12-19 04:10:40'), 1, 1, 10.00, (SELECT product_id FROM products WHERE name = "Carne de vacuno")),
((SELECT invoice_id FROM invoices WHERE date = '2023-12-19 04:10:40'), 2, 1, 18.00, (SELECT product_id FROM products WHERE name = "Carne de pato")),
((SELECT invoice_id FROM invoices WHERE date = '2023-12-19 04:10:40'), 3, 0.5, 22.00, (SELECT product_id FROM products WHERE name = "Carne de caballo"));

INSERT INTO `clients` (`name`, `phone`) VALUES
('Juan Carlos', '123456786'),
('Ana Perez', '987654325');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2024-01-01 13:24:00', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Juan Carlos"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2024-01-01 13:24:00'), 1, 2, 2.00, (SELECT product_id FROM products WHERE name = "Manzana")),
((SELECT invoice_id FROM invoices WHERE date = '2024-01-01 13:24:00'), 2, 1, 4.00, (SELECT product_id FROM products WHERE name = "Uva")),
((SELECT invoice_id FROM invoices WHERE date = '2024-01-01 13:24:00'), 3, 0.5, 2.50, (SELECT product_id FROM products WHERE name = "Lechuga"));


INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2024-01-02 04:10:40', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Ana Perez"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2024-01-02 04:10:40'), 1, 1, 10.00, (SELECT product_id FROM products WHERE name = "Carne de vacuno")),
((SELECT invoice_id FROM invoices WHERE date = '2024-01-02 04:10:40'), 2, 1, 18.00, (SELECT product_id FROM products WHERE name = "Carne de pato")),
((SELECT invoice_id FROM invoices WHERE date = '2024-01-02 04:10:40'), 3, 0.5, 22.00, (SELECT product_id FROM products WHERE name = "Carne de caballo"));

INSERT INTO `clients` (`name`, `phone`) VALUES
('Maria Lopez', '986327655'),
('Pedro Perez', '987654326');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2024-02-03 10:10:10', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Maria Lopez"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2024-02-03 10:10:10'), 1, 1, 10.00, (SELECT product_id FROM products WHERE name = "Patata")),
((SELECT invoice_id FROM invoices WHERE date = '2024-02-03 10:10:10'), 2, 1, 5.00, (SELECT product_id FROM products WHERE name = "Berenjena")),
((SELECT invoice_id FROM invoices WHERE date = '2024-02-03 10:10:10'), 3, 0.5, 24.00, (SELECT product_id FROM products WHERE name = "Carne de buey"));

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2024-03-04 13:12:10', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Pedro Perez"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2024-03-04 13:12:10'), 1, 1, 14.00, (SELECT product_id FROM products WHERE name = "Carne de conejo")),
((SELECT invoice_id FROM invoices WHERE date = '2024-03-04 13:12:10'), 2, 1, 12.00, (SELECT product_id FROM products WHERE name = "Merluza")),
((SELECT invoice_id FROM invoices WHERE date = '2024-03-04 13:12:10'), 3, 0.5, 20.00, (SELECT product_id FROM products WHERE name = "Boquerón"));

INSERT INTO `clients` (`name`, `phone`) VALUES
('Antonio', '123456785'),
('Mercedes', '987654327');

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2024-04-05 13:24:00', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Antonio"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2024-04-05 13:24:00'), 1, 2, 2.50, (SELECT product_id FROM products WHERE name = "Pan de espelta")),
((SELECT invoice_id FROM invoices WHERE date = '2024-04-05 13:24:00'), 2, 1, 3.50, (SELECT product_id FROM products WHERE name = "Pan de maíz")),
((SELECT invoice_id FROM invoices WHERE date = '2024-04-05 13:24:00'), 3, 1, 8.00, (SELECT product_id FROM products WHERE name = "Suavizante"));

INSERT INTO `invoices` (`date`, `user_id`, `client_id`) VALUES
('2024-05-06 04:10:40', (select user_id from users where dni = '12345678A'), (SELECT client_id FROM clients WHERE name = "Mercedes"));

INSERT INTO `invoice_lines` (`invoice_id`, `line_number`, `amount`, `price`, `product_id`) VALUES
((SELECT invoice_id FROM invoices WHERE date = '2024-05-06 04:10:40'), 1, 3, 16.00, (SELECT product_id FROM products WHERE name = "Ambientador")),
((SELECT invoice_id FROM invoices WHERE date = '2024-05-06 04:10:40'), 2, 2, 18.00, (SELECT product_id FROM products WHERE name = "Insecticida")),
((SELECT invoice_id FROM invoices WHERE date = '2024-05-06 04:10:40'), 3, 1, 24.00, (SELECT product_id FROM products WHERE name = "Fregasuelos"));