var mongo = require('mongodb'),
    monk = require('monk');
    db = monk('localhost:27017/fcvision');

function model(){
    this.saveUser = function saveUser(query, callback){
        var collection = db.get('responses');
        collection.insert(query, function(err, doc){
            if (err){
                callback(null, err);
            } else {
                console.log("saved user");
                callback(doc, err);
            }
        })
    };
    
    this.getImages = function getImages(query, callback){
        var collection = db.get('images');
        collection.find(
            query, {
                "_id" : 1, 
                "list" : 1
            }, function(err, docs){
                if (err){
                    callback(null, err);
                } else {
                    console.log("returning preferred images");
                    callback(docs, err);
                }
            });
    }
}

module.exports = new model();
