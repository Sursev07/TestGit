const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const routes = require('./routes');
const nodemon = require('nodemon');
const cors = require("cors");

//Database
const db = require('./config/database');

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
  
const app = express();
app.use(cors());
// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.send('INDEX'));
const port = process.env.PORT || 3000
app.listen(port, console.log(`Server started on port ${port}`));

app.use('/', routes)