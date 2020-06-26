-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  from_user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  message_text TEXT
);
