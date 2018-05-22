var express = require('express');
var router = express.Router();
var User = require('../models/user');
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

/* GET users listing. */
router.get("/", function(req, res, next) {

    User.find()
        .exec()
        .then(docs=>{
          var response = {
            count: docs.length,
            users: docs.map(doc =>{
                return {
                    username:doc.username,
                    firstname: doc.firstname,
                    lastname: doc.lastname,
                    email: doc.email,
                    password:doc.password,
                    request: {
                        type: 'GET',
                        url: 'http://localhost:3000/users/' + doc.username
                    }
                };
            })
        };
        res.status(200).json(response);
    })
    .catch(err=>{console.log(err);res.status(500).json({error:err});});
});

router.post('/signup', function(req, res, next) {
    bcrypt.hash(req.body.password, 10, (err, hash)=>{
        if(err){
            return res.status(500).json({error:err});
        }else{
            var user = new User({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(result=>{
                    res.status(201).json({
                        message: "User created"
                    });
                 })
                .catch(err=>{
                    console.log(err);
                });
        }
    })
});

router.post('/login', ( req, res, next)=>{
    User.find({username:req.body.username})
    .exec()
    .then(user=>{
        if(user.length<1){
            return res.status(401).json({
                message:"Auth failed"
            });
        }
        bcrypt.compare(req.body.password, user[0].password, (err,result)=>{
            if(err){
                return res.status(401).json({message: "Auth failed!"});
            }
            if(result){
                var token = jwt.sign({
                    username:user[0].username,
                    password:user[0].password
                }, "secret",{
                    expiresIn:"1h"
                });
                return res.status(200).json(
                    {   message: "Auth successful!",
                        token: token
                    });
            }
            res.status(401).json({ message:"Auth failed"});
        });
    })
    .catch(err=>{console.log(err)});
});

router.get('/:username', function(req, res, next) {
    var name = req.params.username;
    User.findOne({username: new RegExp('^'+name+'$', "i")})
        .exec()
        .then((doc) => {
            if(doc){
                console.log("from database",doc);
                res.status(200).json(doc);
            }else{
                res.status(404).json({message:"No valid user"});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
    //res.send('respond with a resource');
});

router.patch('/:username', function(req, res, next) {
    var username = req.params.username;
    var updateOps = {};
    for(var ops of req.body){
        updateOps[ops.propName] = ops.value;
    }
    User.update({username:username},{$set: updateOps})
        .exec()
        .then(result=> {
        res.status(200).json({
        message: "User updated",
        request: {
            type: "POST",
            url: "http://localhost:3000/users/"
        }
    });
})
.catch(
        err=>{
        console.log(err);
    res.status(500).json({error:err});
});
    // res.send('Updated');
});

router.delete('/:username', function(req, res, next) {
    var username = req.params.username;
    User.remove({username:username})
        .exec()
        .then(result=>{
        res.status(200).json({
        message: "User deleted",
        request: {
            type: "POST",
            url: "http://localhost:3000/users/"
        }
    });
})
.catch(
        err=>{
        console.log(err);
    res.status(500).json({error:err});
});
    //res.send('Delete');
});


module.exports = router;
