const Sequelize = require('sequelize');
const sequelize = new Sequelize('postgres://postgres:secret@localhost:5434/postgres');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const User = sequelize.define('user', {
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

const Task = sequelize.define('task', {
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

sequelize.sync()
  .then(() => console.log('Tables created successfully'))
  .catch(err => {
    console.error('Unable to create tables, shutting down...', err);
    process.exit(1);
  })

app.use(bodyParser.json())

app.get('/', (req, res) => res.json('main page'))

app.post('/echo', (req, res) => {
  console.log("HI!")
  res.json(req.body)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))