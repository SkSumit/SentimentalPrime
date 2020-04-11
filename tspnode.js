let Twitter = require("twitter");
const fs = require("fs");
const path = require("path");
let Sentiment = require("sentiment");
let sentiment = new Sentiment();

let client = new Twitter({
  consumer_key: "UeFmV8MHuagxN0QBG0a81do4N",
  consumer_secret: "FssNrzQZGqJcB7r86zFhoJFhddokSoyMAhuCSsv68u3atknlSS",
  access_token_key: "2908149590-Sn7BuDGnvyj7gQOnssfPVKmhIVHhY30lbi3cQjd",
  access_token_secret: "p3njhZ0UmbDE1JU5NrUHhuKGi7JOuvgsTa10UVpFeqmTG",
});

// we are going to store sentimental analysis in this array
let sentimentalAnalysis = [];
let sentimentalAnalysisTweet = [];
let sentimentalAnalysisScore = [];


const anal = (name, callback) => {
  let params = { screen_name: name };

  client.get("statuses/user_timeline", params, function (
    error,
    tweets,
    response
  ) {
    if (!error) {
      sentimentalAnalysisTweet.length = [];

      // ?do you know Array.forEach? if not then search
      tweets.forEach((tweet) => {
        // declaring object to store temporary response

        let temp = [];
        temp.tweet = tweet.text;
        temp.result = sentiment.analyze(tweet.text);

        // storing temp object in sentimentalAnalasys array
        sentimentalAnalysis.push(temp);
      });

      sentimentalAnalysis.forEach((element) => {
        sentimentalAnalysisTweet.push(element.tweet);
      });

      sentimentalAnalysis.forEach((element) => {
        sentimentalAnalysisScore.push(element.result.score);
      });

      sentimentalAnalysis.length = 0;

      callback(undefined, {
        tweet: sentimentalAnalysisTweet,
        score: sentimentalAnalysisScore,
      });
      sentimentalAnalysisScore.length = 0;
    }
  });
};

module.exports = anal;
