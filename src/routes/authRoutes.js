const express = require('express');
const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Add a new user
router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  // TODO: more validation
  if (!firstName) {
    return res.status(422).send({ error: 'Please provide first name' });
  }
  if (!lastName) {
    return res.status(422).send({ error: 'Please provide last name' });
  }
  if (!email) {
    return res.status(422).send({ error: 'Please provide email' });
  }
  if (!password) {
    return res.status(422).send({ error: 'Please provide password' });
  }

  const sql =
    'INSERT INTO users (first_name, last_name, email, password) VALUES($1, $2, $3, $4) ';
  // generate encrypted password before signup
  bcrypt.genSalt(10, (err, salt) => {
    if (err) throw err;
    bcrypt.hash(password, salt, (err, hash) => {
      if (err) throw err;
      const user = [firstName, lastName, email, hash];
      db.query(sql, user, (error, results, fields) => {
        if (error) {
          // TODO: format to a better error message
          return res.status(422).send({ error: error.sqlMessage });
        }

        const token = jwt.sign({ userId: email }, 'MY_SECRET_KEY');
        res.send({
          message: 'New user has been created successfully.',
          token
        });
      });
    });
  });
});

router.post('/signin', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).send({ error: 'Must provide email and password' });
  }

  db.query(
    'SELECT * FROM users where email=$1',
    [email],
    (error, results, fields) => {
      if (error) throw error;
      user = results.rows[0];

      // User validation
      if (!user) {
        return res.status(422).send({ error: 'Invalid password or email' });
      }

      bcrypt.compare(password, user.password, function(err, isMatch) {
        if (isMatch) {
          const token = jwt.sign({ userId: user.id }, 'MY_SECRET_KEY');
          res.send({ token });
        } else {
          return res.status(422).send({ error: 'Invalid password or email' });
        }
      });
    }
  );
});

module.exports = router;
