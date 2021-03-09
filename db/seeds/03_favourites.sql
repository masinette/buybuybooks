INSERT INTO favourites (user_id, item_id, date_of_fav, favourite)
VALUES(1, 5, CURRENT_TIMESTAMP, false),
      (2, 4, CURRENT_TIMESTAMP, false),
      (3, 3, CURRENT_TIMESTAMP, false);







/*
DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  date_of_fav CURRENT_TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL,
  favourite BOOLEAN
);
*/
