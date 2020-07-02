DROP TABLE IF EXISTS favorites CASCADE;
CREATE TABLE favorites (
  id SERIAL PRIMARY KEY NOT NULL,
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  user_id INTEGER REFERENCES users(id),
  favorited BOOLEAN NOT NULL,
  UNIQUE (product_id, user_id));

