select * from posts p
join users u on u.id = p.author_id
where u.id = $1;