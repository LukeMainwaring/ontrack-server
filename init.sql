use luke_dev;

-- Note all tables are temporary until proper schemas are defined

-- Table structure for users
  CREATE TABLE IF NOT EXISTS users (
    id int(11) NOT NULL,
    email varchar(200) NOT NULL,
    password varchar(200) NOT NULL,
    created_at datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
  ALTER TABLE users ADD PRIMARY KEY (id);
  ALTER TABLE users ADD UNIQUE (email);
  ALTER TABLE users MODIFY id int(11) NOT NULL AUTO_INCREMENT;

INSERT INTO users (id, email, password, created_at) VALUES
  (1, 'test@g.co', 'password1', '2019-02-28 13:20:20'),
  (2, 'john@g.co', 'password2', '2019-02-28 13:20:20'),
  (3, 'tuts@g.co', 'password3', '2019-02-28 13:20:20'),
  (4, 'tut@g.co', 'password4', '2019-02-28 13:20:20'),
  (5, 'mhd@g.co', 'password5', '2019-02-28 13:20:20');

-- End of setup, queries go below

select * from users;