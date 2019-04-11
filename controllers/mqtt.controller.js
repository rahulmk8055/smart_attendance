
var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://test.mosquitto.org')
 
client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  client.end()
})


var req = require('request');

req.post({
   url: 'someUrl',
   form: { username: 'user', password: '', opaque: 'someValue', logintype: '1'},
   headers: { 
      'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.110 Safari/537.36',
      'Content-Type' : 'application/x-www-form-urlencoded' 
   },
   method: 'POST'
  },

  function (e, r, body) {
      console.log(body);
  });

  var request = require('request');
  var request = require('request');
  
  
  request.post({
    headers: {'content-type' : 'application/x-www-form-urlencoded'},
    url:     'http://localhost/id/enroll',
    form:    { name: 'Aryabatta', id: finger_id, device: 'a'}
  }, function(error, response, body){
    console.log(body);
  });