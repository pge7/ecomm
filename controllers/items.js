var Item = require('../models/item');
var mongoose = require("mongoose");

exports.items_get_all = (req, res, next) => {
    Item.find()
        .exec()
        .then(docs=>{
            var response = {
                count: docs.length,
                items: docs.map(doc =>{
                    return {
                        name:doc.name,
                        descriptions: doc.descriptions,
                        id: doc._id,
                        request:{
                            type:'GET',
                            url:'http://localhost:3000/items/' + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
};

exports.items_get_single =  (req, res, next) =>{
    var id = req.params.itemID;
    Item.findById(id).exec().then((doc) => {
        if(doc){
            console.log("from database",doc);
            res.status(200).json(doc);
        }else{
            res.status(404).json({message:"No valid entry"});
        }

        })
    .catch(err => {
            console.log(err);
        res.status(500).json({error:err});
    });
        //res.send('respond with a resource');
};


exports.items_list = (req, res, next) => {
        var item = new Item({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            category: req.body.category,
            condition: req.body.condition,
            descriptions: req.body.descriptions,
            startingBid: req.body.startingBid,
            minSale: req.body.minSale,
            getItNow: req.body.getItNow,
            length: req.body.length,
            returnable:req.body.returnable,
            auctionEnd:req.body.auctionEnd
        });
        console.log(item);
        item.save()
        .then(result => {
            console.log("hello");
            res.status(201).json(
            {
                message: "Handling post request to /items",
                createdItem: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });

};


exports.items_update = (req, res, next) => {
    var id = req.params.itemID;
    var updateOps = {};
    for(var ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    Item.update({_id:id},{$set: updateOps})
        .exec()
        .then(result=> {
            res.status(200).json({
                message: "Item updated",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/items/"
                }
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({error:err});
        });
    // res.send('Updated');
};


exports.items_delete = (req, res, next) => {
    var id = req.params.itemID;
    Item.remove({_id:id})
        .exec()
        .then(result=>{
        res.status(200).json({
        message: "Item deleted",
        request: {
            type: "POST",
            url: "http://localhost:3000/items/"
        }
        });
    })
    .catch(
            err=>{
            console.log(err);
        res.status(500).json({error:err});
    });
    //res.send('Delete');
};
