
DROP TABLE IF EXISTS favourites CASCADE;
CREATE TABLE favourites (
  id SERIAL PRIMARY KEY NOT NULL,
  date_of_fav TIMESTAMP,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  item_id INTEGER REFERENCES items(id) ON DELETE CASCADE NOT NULL
);
