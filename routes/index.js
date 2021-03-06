var express = require('express');
var router = express.Router();
var controller = require('./../controllers');

/* GET home page. */
router.get('/', controller.views.index);
router.post('/images', controller.views.images);
router.post('/saveResponse', controller.views.saveResponses);

module.exports = router;
