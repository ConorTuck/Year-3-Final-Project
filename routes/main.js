const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://sentiment:y4tKnECuRyhOI9Ml@cluster0.ogd7h.mongodb.net/test";

module.exports = function(app)
{
     app.get('/getMinute',function(req,res){
      MongoClient.connect(uri, async function(err, dbClient) {
         if (err) throw err;
         var db = dbClient.db('minuteSentiment');
         try{
            await db.collection('1min').find().toArray((findErr, results) =>{
            if (findErr) throw findErr;
            else
            console.log("sent Minute collection");
            res.json(results);
            });
         }
         catch{
           console.log("error collecting data!");
         }
         dbClient.close();                                                                                                                                                                                               
       });
     });
   }