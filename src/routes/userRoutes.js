const express = require('express');
const db = require('../db');
const requireAuth = require('../middlewares/requireAuth');

const router = express.Router();

router.use(requireAuth);

// Retrieve all users
router.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (error, results, fields) => {
    if (error) throw error;
    res.send({ data: results, message: 'users list.' });
  });
});

// Retrieve user with id
router.get('/user/:id', (req, res) => {
  let user_id = req.params.id;
  if (!user_id) {
    return res.status(400).send({ message: 'Please provide user_id' });
  }
  db.query(
    'SELECT * FROM users where id=?',
    user_id,
    (error, results, fields) => {
      if (error) throw error;
      res.send({
        data: results[0],
        message: 'users list.'
      });
    }
  );
});

//  Update user with id
router.put('/user', (req, res) => {
  let user_id = req.body.user_id;
  let user = req.body.user;
  if (!user_id || !user) {
    return res
      .status(400)
      .send({ error: user, message: 'Please provide user and user_id' });
  }
  db.query(
    'UPDATE users SET user = ? WHERE id = ?',
    [user, user_id],
    (error, results, fields) => {
      if (error) throw error;
      res.send({ message: 'user has been updated successfully.' });
    }
  );
});

// Delete user
router.delete('/user', (req, res) => {
  let user_id = req.body.user_id;
  if (!user_id) {
    return res.status(400).send({ message: 'Please provide user_id' });
  }
  db.query(
    'DELETE FROM users WHERE id = ?',
    [user_id],
    (error, results, fields) => {
      if (error) throw error;
      res.send({
        message: 'User has been updated successfully.'
      });
    }
  );
});

module.exports = router;
