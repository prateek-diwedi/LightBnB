INSERT INTO users (name, email, password)
VALUES
('Prateek', 'diwedi@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Deepika', 'deepika@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Simmi', 'simmi@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Bandana', 'bandana@gmail.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES
(1, 'Fairmount Hotel', 'https://picsum.photos/200/300', 'https://picsum.photos/200', 500, 5, 5, 5, 'CANADA', 'W Georgia', 'VANCOUVER', 'B.C', 'V3X0E8'),
(2, 'Sheraton Hotel', 'https://picsum.photos/200/300', 'https://picsum.photos/200', 500, 5, 5, 5, 'CANADA', 'W Georgia', 'VANCOUVER', 'B.C', 'V3X0E8'),
(3, 'Marriot Hotel', 'https://picsum.photos/200/300', 'https://picsum.photos/200', 500, 5, 5, 5, 'CANADA', 'W Georgia', 'VANCOUVER', 'B.C', 'V3X0E8'),
(4, 'Hyat Hotel', 'https://picsum.photos/200/300', 'https://picsum.photos/200', 500, 5, 5, 5, 'CANADA', 'W Georgia', 'VANCOUVER', 'B.C', 'V3X0E8');

INSERT INTO reservations ( start_date, end_date, property_id, guest_id)
VALUES 
('08/01/2020', '10,01,2020', 1, 1),
('08/01/2020', '10,01,2020', 2, 2),
('08/01/2020', '10,01,2020', 3, 3),
('08/01/2020', '10,01,2020', 4, 4);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES 
(1, 1, 1, 5, 'great stay'),
(2, 2, 2, 5, 'great stay'),
(3, 3, 3, 5, 'great stay'),
(4, 4, 4, 5, 'great stay');



