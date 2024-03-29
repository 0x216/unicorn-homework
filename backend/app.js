const express = require('express');
const sequelize = require('./src/database/controller');
const userRoutes = require('./src/routes/userRoutes');
const trackingRoutes = require('./src/routes/trackingRoutes');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV !== 'test') {
    sequelize.authenticate()
      .then(() => console.log('Database connected.'))
      .catch(err => console.log('Error: ' + err));
  }
app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/tracking', trackingRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

module.exports = app;
