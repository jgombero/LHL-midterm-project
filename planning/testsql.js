SELECT DISTINCT products.owner_id, products.id AS product_id, messages.id AS message_id, messages.from_user_id, messages.to_user_id, products.name, products.photo_url, message_text, u3.name AS to_name, u2.name AS from_name, messages.time AS timestamp
FROM messages
JOIN products ON (products.id = messages.product_id)
JOIN users ON (users.id = products.owner_id)
JOIN users u2 ON (u2.id = messages.from_user_id)
JOIN users u3 ON (u3.id = messages.to_user_id)
WHERE messages.to_user_id = $1 OR messages.from_user_id = $1
ORDER BY messages.time;
