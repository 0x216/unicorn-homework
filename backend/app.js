const express = require('express');
const sequelize = require('./src/database/controller');
const userRoutes = require('./src/routes/userRoutes');
const trackingRoutes = require('./src/routes/trackingRoutes');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    sequelize.authenticate()
      .then(() => console.log('Database connected.'))
      .catch(err => console.log('Error: ' + err));
  }
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);
app.use('/tracking', trackingRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
