-- Drop and recreate Widgets table (Example)
DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages (
  id SERIAL PRIMARY KEY NOT NULL,
  from_user_id INTEGER REFERENCES users(id),
  to_user_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
  message_text TEXT,
  time TIMESTAMP DEFAULT NOW()::timestamp
);
