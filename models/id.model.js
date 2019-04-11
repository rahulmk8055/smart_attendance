const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let ProductSchema = new Schema({
    name: {type: String, required: true, max: 100},
    id: {type: String, required: true, max: 100},
    device: {type: String, required: true, max: 100}
});


// Export the model
module.exports = mongoose.model('USN', ProductSchema);