var mongoose = require('mongoose');
var userSchema = mongoose.Schema({
    username: {type: String, required: true, unique:true},
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    email:{
        type: String,
        required: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: {type: String, required: true}
})
module.exports = mongoose.model('User', userSchema);