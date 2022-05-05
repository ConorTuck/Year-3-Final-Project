const MongoClient = require("mongodb").MongoClient;
const uri = "mongodb+srv://sentiment:y4tKnECuRyhOI9Ml@cluster0.ogd7h.mongodb.net/test";
const  express = require('express');
var path = require('path')

module.exports = function(app)
{
     app.get('/getEOSSentiment', function(req,res){
      MongoClient.connect(uri, async function(err, dbClient) {
         if (err) throw err;
         var db = dbClient.db('eosio_data');
         try{
           var tempArray = [];
           //collect data in batches/pagination
           for(var i = 0; i <= Math.ceil(await db.collection('sentiment').countDocuments({}) / 20); i++){
              await db.collection('sentiment').find({}, {"limit":20, "skip":20*i}).toArray((findErr, results) =>{
              if (findErr) throw findErr;
              else
              tempArray.push(results)
              });
          };
          res.json(tempArray);
        }
         catch{
           console.log("error collecting data!");
         }
         dbClient.close();                                                                                                                                                                                               
       });
     });

     app.get('/getEosioData',function(req,res){
      const baseUrl = "https://api-pub.bitfinex.com/v2/";
      const pathParams = "candles/trade:1h:tEOSUSD/hist"
      const queryParams = "limit=10000&start=1645891200000&sort=1"

      const axios = require('axios');

      axios.get(`${baseUrl}/${pathParams}?${queryParams}`)
        .then(response => {
            res.json(response.data) 
        }, error => {
            console.log(error);
        }) 
    });

    app.get('/getBSVSentiment', function(req,res){
      MongoClient.connect(uri, async function(err, dbClient) {
         if (err) throw err;
         var db = dbClient.db('bitcoinSV_data');
         try{
           var tempArray = [];
           for(var i = 0; i <= Math.ceil(await db.collection('sentiment').countDocuments({}) / 20); i++){
              await db.collection('sentiment').find({}, {"limit":20, "skip":20*i}).toArray((findErr, results) =>{
              if (findErr) throw findErr;
              else
              tempArray.push(results)
              });
          };
          res.json(tempArray);
        }
         catch{
           console.log("error collecting data!");
         }
         dbClient.close();                                                                                                                                                                                               
       });
     });

    app.get('/getBSVData',function(req,res){
      const baseUrl = "https://api-pub.bitfinex.com/v2/";
      const pathParams = "candles/trade:1h:tBSVUSD/hist"
      const queryParams = "limit=10000&start=1645891200000&sort=1"

      const axios = require('axios');

      axios.get(`${baseUrl}/${pathParams}?${queryParams}`)
        .then(response => {
            res.json(response.data) 
        }, error => {
            console.log(error);
        }) 
    });

    app.use(express.static(path.join(__dirname, 'build')));

    app.get('*', (req,res) =>{
      res.sendFile(path.join(__dirname+'/build/index.html'));
  });

   }