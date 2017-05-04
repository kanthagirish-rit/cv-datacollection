var mongo = require('mongodb'),
    monk = require('monk'),
    db = monk('localhost:27017/fcvision'),
    async =require('async'),
    ObjectId = mongo.ObjectID;

var returnImageCount = 20;

function model(){
    this.saveUser = function saveUser(query, callback){
        var collection = db.get('responses');
        if (typeof query.gender == "string") {
            query.gender = [query.gender]
        } if (typeof query.ethnicity == "string") {
            query.ethnicity = [query.ethnicity]
        }
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
        var list = [];
        async.waterfall(
            [
                function(cb){
                    if (typeof query.gender == "string") {
                        query.gender = [query.gender]
                    } if (typeof query.ethnicity == "string") {
                        query.ethnicity = [query.ethnicity]
                    }
                    query.gender = {
                        "$in" : query.gender
                    }
                    query.ethnicity = {
                        "$in" : query.ethnicity
                    }
                    cb();
                },
                function(cb){
                    console.log("query: "+JSON.stringify(query));
                    collection.find(
                        query, {
                            "_id" : 1, 
                            "list" : 1
                        }, function(err, docs){
                            cb(null, err, docs);
                        });
                },
                function(err, docs, cb){
                    if (err){
                        cb(new Error("DB error"));
                        
                    } else {
                        cb(null, docs);
                    }
                },
                function(docs, cb){
                    async.forEach(docs, function(doc, cbk){
                        list = list.concat(doc.list);
                        cbk();
                    }, function(err){
                        if (err) cb(new Error("loop error"));
                        cb();
                    });
                },
                function(cb){
                    shuffle(list, cb);
                }
            ],
            function(err, list){
                if(err) console.log(err);
                callback(list.slice(0, returnImageCount), err);
            }
        );
        
        
    }
    
    this.saveResponses = function saveResponses(query, callback){
        var collection = db.get('responses');
        
        collection.update({
                "_id" : ObjectId(query.id)
            }, {
                "$set" : {
                    "responses" : query.responses    
                }
            });
    }
}

function shuffle(a, callback) {
    for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    callback(null, a);
}

module.exports = new model();
