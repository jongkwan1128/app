const express = require('express');
const router = express.Router();

router.get('/', function(req, res){
    res.sendfile('./client/index.html');
});

router.use('/bower_components', express.static(__dirname + '/../client/bower_components'));
router.use('/styles', express.static(__dirname + '/../client/styles'));
router.use('/modules', express.static(__dirname + '/../client/modules'));

module.exports = router;