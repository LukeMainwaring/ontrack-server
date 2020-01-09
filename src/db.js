const { Pool } = require('pg');
const keys = require('../keys');

// Postgres Client Setup
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort
});
pgClient.on('error', () => console.log('lost pg connection'));

// Move this to an initialization script
const initScript = `
CREATE TABLE IF NOT EXISTS users(
 id SERIAL NOT NULL PRIMARY KEY,
 first_name varchar(50) NOT NULL,
 last_name varchar(50) NOT NULL,
 email varchar(100) UNIQUE NOT NULL,
 password varchar(200) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const initUsers = `
INSERT INTO users (id, first_name, last_name, email, password, created_at) VALUES
  (1, 'test', 'test', test@g.co', 'password1', '2019-02-28 13:20:20'),
  (2, 'john', 'j', 'john@g.co', 'password2', '2019-02-28 13:20:20'),
  (3, 'tuts', 't', 'tuts@g.co', 'password3', '2019-02-28 13:20:20'),
  (4, 'tut', 't', 'tut@g.co', 'password4', '2019-02-28 13:20:20'),
`;

pgClient.query(initScript).catch(err => console.log(err));

module.exports = pgClient;
