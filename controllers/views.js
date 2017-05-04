var model = require('./../models').model;

function Views(){

    this.index = function index(req, res){
        res.render('index');
    };
    
    this.images = function images(req, res){
        var data = req.body;
        console.log(data);
        model.saveUser(data, function(result1, err){
            if (err){
                res.json({"success": false});
            } else {
                console.log(JSON.stringify(result1));
                data = {
                    "gender" : data.gender,
                    "ethnicity" : data.ethnicity,
                };
                model.getImages(data, function(result2, err){
                    if (err){
                        res.json({"success": false});
                    }
                    else {
                        console.log("returning " + result2.length + " images");
                        data = {
                            "id": result1._id,
                            "list": result2
                        }
                        res.render('images', {data : data});
                    }
                });
            }
        });
    };
    
    this.saveResponses = function saveResponses(req, res){
        console.log("views.saveResponses()");
        var data = req.body;
        model.saveResponses(data, function(result, err){
            if (err){
                res.json({"success": false});
            } else {
                res.json({"success" : true});
            }
        });
    };
}
module.exports = new Views();
