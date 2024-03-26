const express = require('express');
const sequelize = require('./src/database/controller');
const userRoutes = require('./src/routes/userRoutes');
const app = express();
const port = 8000;

sequelize.authenticate()
  .then(() => console.log('Database connected.'))
  .catch(err => console.log('Error: ' + err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/users', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
  });


app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});