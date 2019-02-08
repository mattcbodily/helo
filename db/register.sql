insert into users (username, password)
values (${user}, ${pass})
returning username, profile_pic;