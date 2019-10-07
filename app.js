const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


//adding promise library to mongoose
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://yurka:1234@68.183.201.75:27017/timesheet", {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('Database connection successful')
  })
  .catch(err => {
    console.error('Database connection error')
  });
  mongoose.set('useCreateIndex', true);

const app = express();

///DB Connection and User
// Connection string: mongodb://yurka:1234@68.183.201.75:27017/timesheet


//Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes
app.use('/users', require('./routes/users'));

// Start the server

const port = process.env.PORT || 3000;
app.listen(port);
console.log(`Server is listening on port ${port}`);
