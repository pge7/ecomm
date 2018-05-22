var express = require('express');
var router = express.Router();
var Item = require('../models/item');
var mongoose = require('mongoose');
var checkAuth = require("../middleware/check-auth");

var itemsController = require('../controllers/items');

/* GET users listing. */



router.get("/", itemsController.items_get_all);

router.get('/list', function(req, res, next) {
    res.render('listItem');
});
router.post('/list',checkAuth, itemsController.items_list);

router.get('/:itemID', itemsController.items_get_single);

router.patch('/:itemID',itemsController.items_update);

router.delete('/:itemID', itemsController.items_delete);
module.exports = router;