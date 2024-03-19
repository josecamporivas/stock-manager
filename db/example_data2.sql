INSERT INTO `clients` (`name`, `phone`) VALUES
('Juan Carlos', '123456789'),
('Ana Perez', '987654321');

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