var mongoose = require('mongoose');
var itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    descriptions: {type: String,required: true},
    condition: {type: Number, required: true},
    length: {type: Number, required: true},
    category: {type: String, required: true},
    minSale:{type: Number, required: true},
    startingBid: {type: Number, required: true},
    getItNow: {type: Number, required: true},
    returnable: {type: Boolean, required: true},
    auctionEnd: Date

})
module.exports = mongoose.model('Item', itemSchema);