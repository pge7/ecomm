var mongoose = require('mongoose');
var rateSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    timeOfRate: {type: Date, required: true},
    stars: {type: Number, required: true},
    comment:String
});
module.exports = mongoose.model('Rate', rateSchema);