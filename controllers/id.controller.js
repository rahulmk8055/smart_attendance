const finger = require('/home/rahulmk8055/smart_attendance/models/id.model');

//Simple version, without validation or sanitation
// var id_name = {};
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.enroll = function (req, res , next) {
    let id_name_new = new finger(
        {
            name: req.body.name,
            id: req.body.id,
            device: req.body.device
        }
    );
    // res.send("hrll")
    // var hi = req.body.id;
    // console.log(hi);
    id_name_new.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Name and id stored sucessfully');
    })
};

exports.check = function(req, res) {
// res.send("hello check");
 var id = req.body.id;
 var device = req.body.device;
//  var name = "hello";
 finger.find({id : id}, function (err, docs) {
     console.log(docs);
    //  var name = docs[0].name;
    //  res.send(name) ;
 })
//  res.send(name)


};