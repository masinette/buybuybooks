
-- DROP TABLE IF EXISTS items CASCADE;
-- CREATE TABLE items (
--   id SERIAL PRIMARY KEY NOT NULL,
--   name VARCHAR(250) NOT NULL,
--   image_url VARCHAR(250) NOT NULL,
--   sold BOOLEAN NOT NULL DEFAULT FALSE,
--   price INTEGER NOT NULL,
--   description TEXT NOT NULL,
--   category INTEGER,
--   created_at TIMESTAMP,
--   creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
--   buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL
-- );


INSERT INTO items (name, sold, price, description, category, creator_id, buyer_id, image_url)
VALUES('bicycle', false, 11111, '10 speed schwinn bicycle', 1, 1, 3, 'shorturl.at/hqBJV'),
      ('toaster', false, 2222, 'Pink styled toaster brand new.', 3, 2, 1, 'shorturl.at/vwNV9'),
      ('Battery', false, 1000, 'Fun potato battery, great with kids but use with caution.',4, 3, 2, 'shorturl.at/ftI28'),
      ('Skateboard', false, 2200, 'Skateboard barely used. Price non-negotiable', 5, 1, 3, 'shorturl.at/dCELZ'),
      ('Levis jeans', false, 4522, 'Minor wear, still in good condition. Only worn twice.', 2, 2, 1, 'shorturl.at/oNTVZ'),
      ('Hammer', false, 1500, '16 oz Claw Hammer is used to easily hammer and remove nails and features a wood handle for a comfortable grip.', 10, 2, 1, 'shorturl.at/pINV7'),
      ('Artificial Potted Plant', false, 1109, 'Artificial potted plant, indoor/outdoor monstera7 ½ " (19 cm)', 6, 2, 1, 'shorturl.at/awAW5'),
      ('Ocean Spider Plant', false, 2300, 'Ocean (Blue) Spider Plant - Easy to Grow - Cleans the Air - NEW - 3.5', 6, 2, 1, 'shorturl.at/arzG4')
      ('Artificial Potted Plant', false, 1109, 'Artificial potted plant, indoor/outdoor monstera7 ½ " (19 cm)', 6, 2, 1, 'shorturl.at/awAW5'),
      ('Microwave', false, 3409, 'This Oster 1.1 cu. ft. Microwave Oven offers one-touch operation and 10 power levels to meet a variety of cooking needs.', 3, 2, 1, 'shorturl.at/hnDW6'),
      ('Food Processor', false, 9009, 'Great condition. Makes food prep much easier and has different features. Price negotiable.', 3, 2, 1, 'shorturl.at/dAFR4'),
      ('Electric Bike', false, 2345, '7-Speed Bike great for riding uphill and in the city.', 1, 2, 1, 'shorturl.at/dAFR4'),
      ('Barbie Dream Estate Toy', false, 9009, 'The Barbie Dreamplane is ready to help imaginations take off to anywhere.', 8, 2, 1, 'shorturl.at/luBQ6'),
      ('Dewalt Drill', false, 9009, 'The DCD708B 20V MAX Compact Brushless Drill/Driver is the most compact DEWALT Drill in the 20V MAX Platform at 6.3-inch front to back.', 10, 2, 1, 'shorturl.at/dAFR4');
