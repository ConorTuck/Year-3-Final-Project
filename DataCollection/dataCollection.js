//mongodb setup
var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://sentiment:y4tKnECuRyhOI9Ml@cluster0.ogd7h.mongodb.net/test";

//importing natural.js and twitter.js
var natural = require('natural');
var Twitter = require('twitter');

//importing env
require('dotenv/config');

//sentiment Analysis
var Analyzer = require('natural').SentimentAnalyzer;
var stemmer = require('natural').PorterStemmer;
var analyzer = new Analyzer("English", stemmer, "afinn");

//tokenization
let tokenizer = new natural.WordTokenizer();

//twitter keys
const apiKey = process.env.apiKey;
const apiSecretKey = process.env.apiSecretKey;
const accessToken = process.env.accessToken;
const accessTokenSecret = process.env.accessTokenSecret;
const bearerToken = process.env.bearerToken;

const apiKey2 = process.env.apiKey2;
const apiSecretKey2 = process.env.apiSecretKey2;
const accessToken2 = process.env.accessToken2;
const accessTokenSecret2 = process.env.accessTokenSecret2;


//creating the twitter clients
var twitterClient = new Twitter({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
  });

  var twitterClient2 = new Twitter({
    consumer_key:  apiKey2,
    consumer_secret: apiSecretKey2,
    access_token_key: accessToken2,
    access_token_secret: accessTokenSecret2
  });


  //asset class to add assets to be collected.
  class Asset{
    dbPath;
    hourlySentimentScore = 0;
    hourlyCounter = 0;
    params; 
    client;

    constructor(dbPath, params, client) {
        this.dbPath = dbPath
        this.params = params
        this.client = client
    }

    //increment the counter score
    incrementHourlyCounter(){
        this.hourlyCounter++
    }

    //add sentiment score
    addSentimentScore(score){
      this.hourlySentimentScore += score
    }

    //reset counter and score
    resetValues(){
      this.hourlySentimentScore = 0
      this.hourlyCounter = 0
    }
}

  var paramsEOS = '#EOS,#EOSIO,eos,eosio'
  var paramsBSV = '#bitcoinsv, #bsv, BSV, BitcoinSV'

  var eosio = new Asset("eosio_data", paramsEOS,twitterClient)
  var bsv = new Asset("bitcoinSV_data", paramsBSV,twitterClient2)

  function dataCollection(asset){
    //using twitter api to collect data based on a key phrase
    asset.client.stream('statuses/filter', {track: `${asset.params}`}, function(stream) {
      console.log(`${asset.dbPath} Collection Started!`)
      stream.on('data', function(tweet) {
        try {
          var sentimentValue = analyzer.getSentiment(tokenizer.tokenize(tweet.text))
          if(!isNaN(sentimentValue)){
          asset.addSentimentScore(sentimentValue);
          asset.incrementHourlyCounter()
          }
          else console.log("score was NaN!")
          
        } catch (error) {
          console.log("Error Collecting Sentiment!")
        }
    
        stream.on('error', function(error) {
          dataCollection(asset)
          console.log("stream crashed, stream restarted!" + error);
        });
      });
    });
  }

  //upload data to mongodb database
  function dataUpload(asset){
    if(asset.hourlyCounter > 0){
      var sentiment = asset.hourlySentimentScore/asset.hourlyCounter
      asset.resetValues()
      //connecting to the mongodb database
      MongoClient.connect(uri, async function(err, dbClient) {
        if (err) throw err;
        var db = dbClient.db(asset.dbPath);
        console.log("Database conected!");
        var today = new Date();
        var currentDate = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        var currentHour = today.getHours();
            
        //inserting a new document to the database
        try{
        await db.collection('sentiment').insertOne({
        date: currentDate,
        hour: currentHour,
        score: sentiment
        });
        console.log(`added a document to ${asset.dbPath} database!`+ '\n')
        }
        catch{
        console.log("error inserting!")
        }
              
        dbClient.close();    
        });
    }
    else{
      dataCollection(asset)
    }
  }

  //create a interval to upload the data every hour
  function hourlyUpdate(){
    setInterval(uploadAssets,1000 * 60 * 60)
  }

  function uploadAssets(){
    dataUpload(eosio)
    //dataUpload(bsv)
  }

  var tempTime = new Date();
  if(tempTime.getMinutes === 0){
    hourlyUpdate()
  }
  else{
    tempTime.setHours(tempTime.getHours() + 1)
    tempTime.setMinutes(0)
    tempTime.setSeconds(0)

    setTimeout(hourlyUpdate,tempTime - new Date())
  }

  //starts collection and sentiment analysis
  dataCollection(eosio);
  //dataCollection(bsv);

  require('events').EventEmitter.defaultMaxListeners = 20