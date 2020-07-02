INSERT INTO favorites (product_id, user_id, favorited) VALUES (3, 3, TRUE)
ON CONFLICT (product_id, user_id) DO UPDATE SET favorited = NOT favorites.favorited WHERE favorites.product_id = 3 AND favorites.user_id = 3;

select * from favorites;
