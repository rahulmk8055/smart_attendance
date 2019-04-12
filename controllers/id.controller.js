const mine = require('/home/rahulmk8055/smart_attendance/models/id.model');

//Simple version, without validation or sanitation
// var id_name = {};
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.enroll = function (req, res , next) {
    let id_name_new = new mine(
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