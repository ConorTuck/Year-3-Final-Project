//imports
var express = require('express');
var session = require ('express-session');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

require('dotenv/config')
//allows axios to fetch data without cors security feature stoping it
var cors = require('cors');

var uri = "mongodb+srv://sentiment:y4tKnECuRyhOI9Ml@cluster0.ogd7h.mongodb.net/test";
const app = express();
const port = 8000;

//connect to the database
MongoClient.connect(uri, async function(err, dbClient) {
    if (err) throw err;

    var db = dbClient.db('minuteSentiment');
    console.log("Database conected!");
});

app.use(cors());

//session data.
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

app.listen(port, () => console.log(`app listening on port ${port}!`));
