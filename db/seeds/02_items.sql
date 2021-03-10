
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
VALUES('bicycle', false, 11111, '10 speed schwinn bicycle', 1, 1, 3, 'https://cdn.shopify.com/s/files/1/1245/1481/products/600_HERO_WEB_FIRST_1024x1024.jpg?v=1597712912'),
      ('toaster', false, 2222, 'childs toaster', 2, 2, 1, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgokCPsaCGnbVP3AQaAW4afvJXHNMfwl3Ro9EEhwJrU6B41LT0mnuMIRRXPgIw_SUgF2jJmo0&usqp=CAc'),
      ('potato', false, 1000, 'potato battery',3, 3, 2, 'https://i.stack.imgur.com/PtQPU.jpg'),
      ('skateboard', false, 220, 'element board 2018', 1, 1, 3, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fchinasportsleisure.en.made-in-china.com%2Fproduct%2FrXtEAIeuuiRP%2FChina-Hot-Sale-Cool-Skateboard-Stuff-Canada-Maple-Old-School-Skateboards.html&psig=AOvVaw0PKxJBnbpMvKOZTwRMZ7th&ust=1615412169867000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMj277aVpO8CFQAAAAAdAAAAABAD'),
      ('levis jeans', false, 2222, 'blue denim', 2, 2, 1, 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F58617232631245807%2F&psig=AOvVaw0ELAlQZNX6QEoa6jsPAX5g&ust=1615412194969000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCPiXicWVpO8CFQAAAAAdAAAAABAD');

