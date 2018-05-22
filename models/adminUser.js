var mongoose = require('mongoose');
var adminSchema = mongoose.Schema({
    username: {type: String, ref: 'User'},
    position: {type: String, required: true}
})
module.exports = mongoose.model('Admin', adminSchema);