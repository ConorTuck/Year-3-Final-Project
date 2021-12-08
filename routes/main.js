const { MongoClient } = require("mongodb");

module.exports = function(app)

{

//this renders nothing
     app.get('/',function(req,res){
        res.render('')
     });

}
