

SELECT DISTINCT products.owner_id, messages.from_user_id, products.name, products.photo_url, message_text, users.name AS owner_name, u2.name AS sender_name
FROM messages
JOIN products ON (products.id = messages.product_id)
JOIN users ON (users.id = products.owner_id)
JOIN users u2 ON (u2.id = messages.from_user_id)
WHERE products.owner_id = 4 OR messages.from_user_id = 4;

