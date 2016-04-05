var Twitter = require('twitter');
var express = require('express');

var app = express();

console.log('is twitter stuff? ', (!!process.env.TWITTER_CONSUMER_KEY && !!process.env.TWITTER_CONSUMER_SECRET && !!process.env.TWITTER_BEARER_TOKEN) );

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    bearer_token: process.env.TWITTER_BEARER_TOKEN
});

app.get('/twitter', function (req, res) {
    client.get('search/tweets', {q: '#ngj16'}, function(error, tweets, response){
        if (error) {
            console.log(error);
            res.status(500).json({
                error: error
            });
        }
        else {
            console.log(tweets);
            res.json({
                tweets: tweets
            });
        }
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});