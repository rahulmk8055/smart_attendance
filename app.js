const express = require('express');
const bodyParser = require('body-parser');
var request = require('request');

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://192.168.31.140:1883')
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
    client.subscribe('/id/a', function (err) {
      if (!err) {
        console.log("Connection to mqtt server sucessful")
      }
    })
  })

client.on('message', function (topic, message) {
    // message is Buffer
    var finger_id  = message.toString();
    console.log(finger_id);

    // req.post({
    //     url: 'localhost:8000/id/enroll',
    //     form: { name: 'Aryabatta', id: finger_id, device: 'a'},
    //     headers: { 
    //        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
    //        'Content-Type' : 'application/x-www-form-urlencoded' 
    //     },
    //     method: 'POST'
    //    },
     
    //    function (e, r, body) {
    //        console.log(body);
    //    });
    request.post({
        headers: {'content-type' : 'application/x-www-form-urlencoded'},
        url:     'http://localhost/id/enroll',
        form:    { name: 'Aryabatta', id: finger_id, device: 'a'}
      }, function(error, response, body){
        console.log(body);
      });
    client.end();
})

let port = 8000;

app.listen(port, () => {
    console.log('Server is up and running on port numner ' + port);
});