const express = require('express');
const bodyParser = require('body-parser');


const id_names = require('./routes/id.route'); // Imports routes 
var mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/attendance',{useNewUrlParser: true})
  .then(() =>  console.log('connection succesful'))
  .catch((err) => console.error(err));
// initialize our express app
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/id', id_names);


let port = 8000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});