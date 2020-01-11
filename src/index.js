const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const PORT = 8080;
// const HOST = '0.0.0.0';

const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(authRoutes);
app.use(userRoutes);

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`);

app.get('/test', async (req, res) => {
  res.send('hello, world!');
});

// app.listen(PORT);
app.listen(PORT, err => {
  console.log(`Listening on port ${PORT}`);
});
