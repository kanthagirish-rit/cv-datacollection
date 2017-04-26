var mongo = require('mongodb'),
    monk = require('monk');
    
module.exports = {
    db : monk('localhost:27017/fcvision')
};

