const jwt = require('jsonwebtoken');
const db = require('../db');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).send({ error: 'You must be logged in' });
  }

  const token = authorization.replace('Bearer ', '');
  jwt.verify(token, 'MY_SECRET_KEY', async (err, payload) => {
    if (err) {
      return res.status(401).send({ error: 'You must be logged in' });
    }
    const { userId } = payload;

    db.query(
      'SELECT * FROM users where email=?',
      userId,
      (error, results, fields) => {
        if (error) throw error;
        req.user = results[0];
        next();
      }
    );
  });
};
