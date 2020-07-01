SELECT DISTINCT products.owner_id, products.name, products.photo_url, users.name AS owner_name, u2.name AS sender_name
  FROM messages
  JOIN products ON (products.id = messages.product_id)
  JOIN users ON (users.id = products.owner_id)
  JOIN users u2 ON (u2.id = messages.from_user_id)
  WHERE products.owner_id = 1 OR messages.from_user_id = 1
  GROUP BY products.owner_id, products.id, products.name, products.photo_url, users.name, u2.name;

