//imports
var express = require('express');
var MongoClient = require('mongodb').MongoClient;

var uri = "mongodb+srv://sentiment:y4tKnECuRyhOI9Ml@cluster0.ogd7h.mongodb.net/test";
const app = express();
const port = 8000;

//test to connect to the database
MongoClient.connect(uri, async function(err, dbClient) {
    if (err) throw err;

    var db = dbClient.db('minuteSentiment');
    console.log("Database conected!");
    dbClient.close()
});


require('./routes/main')(app,port);

app.listen(port, () => console.log(`app listening on port ${port}!`));