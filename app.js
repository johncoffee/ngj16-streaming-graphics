var Twitter = require('twitter');
var express = require('express');

var app = express();

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

var tweetsCache = null;
setInterval(function () {
    tweetsCache = null;
}, 60000);

app.get('/twitter', function (req, res) {
    if (tweetsCache) {
        res.json(tweetsCache);
    }
    else {
        client.get('search/tweets', {q: '#ngj16'}, function(error, tweets, response){
            if (error) {
                res.status(500).json({
                    error: error
                });
            }
            else {
                tweetsCache = tweets;
                res.json(tweets);
            }
        });
    }
});

app.listen(3000, function () {
    console.log('Listening on port 3000, not much has changed but they live on the water');
});