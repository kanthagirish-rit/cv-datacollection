var model = require('./../models').model;

function views(){
    this.index = function index(req, res){
        res.render('index');
    };
    
    this.images = function images(req, res){
        var data = req.body;
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
                        console.log(JSON.stringify(result2[0].list));
                        data = {
                            "id": result1._id,
                            "list": result2[0].list
                        }
                        res.render('images', {data : data});
                    }
                });
            }
        });
    };
}
module.exports = new views();
