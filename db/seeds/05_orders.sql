INSERT INTO orders (item_id, buyer_id, date_bought)
VALUES (1, 3, NOW()),
       (2, 2, NOW()),
       (3, 1, NOW());




/*
CREATE TABLE orders (
item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL,
buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
date_bought TIMESTAMP
);
*/
