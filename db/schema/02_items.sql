
DROP TABLE IF EXISTS items CASCADE;
CREATE TABLE items (
  id SERIAL PRIMARY KEY NOT NULL,
  creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE NOT NULL,
  name VARCHAR(250) NOT NULL,
  image_url TEXT NOT NULL,
  sold BOOLEAN NOT NULL DEFAULT FALSE,
  price INTEGER NOT NULL,
  description TEXT NOT NULL,
  category INTEGER,
  created_at TIMESTAMP,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
