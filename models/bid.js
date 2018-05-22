var mongoose = require('mongoose');
var bidSchema = mongoose.Schema({
    id: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'},
    timeOfBid: {type: Date, required: true},
    bidAmount: {type: Number, required: true}
});
module.exports = mongoose.model('Bid', bidSchema);