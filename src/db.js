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
 id uuid NOT NULL PRIMARY KEY,
 first_name varchar(50) NOT NULL,
 last_name varchar(50) NOT NULL,
 email varchar(100) UNIQUE NOT NULL,
 password varchar(200) NOT NULL,
 created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const initUsers = `
INSERT INTO users (first_name, last_name, email, password) VALUES
  ('test', 'test', test@g.co', 'password1'),
  ('john', 'j', 'john@g.co', 'password2'),
  ('tuts', 't', 'tuts@g.co', 'password3'),
  ('tut', 't', 'tut@g.co', 'password4'),
`;

pgClient.query(initScript).catch(err => console.log(err));

module.exports = pgClient;
