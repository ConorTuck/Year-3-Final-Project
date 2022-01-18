//imports
var express = require('express');
var session = require ('express-session');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var natural = require('natural');
var Twitter = require('twitter');
require('dotenv/config');

var uri = "mongodb+srv://sentiment:y4tKnECuRyhOI9Ml@cluster0.ogd7h.mongodb.net/test";
const app = express();
const port = 8000;

const apiKey = process.env.apiKey;
const apiSecretKey = process.env.apiSecretKey;
const accessToken = process.env.accessToken;
const accessTokenSecret = process.env.accessTokenSecret;
const bearerToken = process.env.bearerToken;

var twitterClient = new Twitter({
    consumer_key: apiKey,
    consumer_secret: apiSecretKey,
    access_token_key: accessToken,
    access_token_secret: accessTokenSecret
});

MongoClient.connect(uri, async function(err, dbClient) {
    if (err) throw err;

    var db = dbClient.db('minuteSentiment');
    console.log("Database conected!");
});

app.use(session({

    secret: 'somerandomstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }

}));

app.use(bodyParser.urlencoded({ extended: true }));

require('./routes/main')(app,port);

app.set('views',__dirname + '/views');

app.listen(port, () => console.log('app listening on port ${port}!'));
