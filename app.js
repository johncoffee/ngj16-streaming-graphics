var Twitter = require('twitter');
var express = require('express');

var app = express();

var creds = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY.trim(),
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET.trim(),
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY.trim(),
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET.trim(),
};
console.log(creds);
var client = new Twitter(creds);

var tweetsCache = null;
setInterval(function () {
    tweetsCache = null;
}, 60000);

app.get('/twitter/:hashtag', function (req, res) {
    if (tweetsCache) {
        res.json(tweetsCache);
    }
    else {
        client.get('search/tweets', {q: '#'+req.params.hashtag}, function(error, tweets, response){
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

app.use(express.static('./'));

app.listen(8080, function () {
    console.log('Listening on port 8080, not much has changed but they live on the water');
});