const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.31.140:1883')

var Api_Client = require('node-rest-client').Client;
 
var api_client = new Api_Client();
// client.on('connect', function () {
//     client.subscribe('/id/a', function (err) {
//       if (!err) {
//         console.log("Connection to mqtt server sucessful")
//       }
//     })
//   })

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

client.on('connect', function () {
    client.subscribe('/id/check/a', function (err) {
      if (!err) {
        console.log("Connection to mqtt server sucessful")
      }
    })
  })

client.on('message', function (topic, message) {
    // message is Buffer
    
    var finger_id  = message.toString();
    // console.log(finger_id);
    finger_id = finger_id.trim()
    console.log(finger_id);


    if(topic == "/id/check/a"){
      device = "a";
    }
    var args = {
      data: { id: finger_id, device: device},
      headers: { "Content-Type": "application/x-www-form-urlencoded" }
  };
   
  // api_client.post("http://localhost:8000/id/enroll/", args, function (data, response) {
  //     // parsed response body as js object
  //     // console.log(body);
  //     // raw response
  //     // console.log(response);
  // });
  api_client.post("http://localhost:8000/id/check/", args, function (data, response) {
      // parsed response body as js object
      // console.log(body);
      // raw response
      // console.log(response);
  });


    // client.end();
})

let port = 8000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});