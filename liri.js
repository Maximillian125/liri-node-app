// Variables to get spotify, request, and twitter apis. Also requiring exports from keys.js.
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require("node-spotify-api");
var request = require("request");
var Twitter = require("twitter");
// Variable to call for 'my-tweets', 'spotify-this-song', 'movie-this', 'do-what-it-says'.
var command = process.argv[2];
var songAndMovieName = process.argv[3];

// Create variable that holds the function so that this thing doesn't grab tweets every single time.
var getTweets = function() {
//Code for returning tweets
	var client = new Twitter(keys.twitterKeys);

	var params = {screen_name: 'randy_magnum007'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	    for (var i = 0; i < tweets.length; i++) {
	    	console.log(tweets[i].created_at);
	    	console.log(tweets[i].text);
	    	console.log('-------------------');
	    };
	    
	  }
	});

}

// Code to add access codes for Spotify API and search
var getArtistsName = function(artist){
	return artist.name;
}
// Function to hold spotify access and search for tracks. 
var spotifyMeCapn = function() {
	var music = new Spotify ({
		id: 'e7618940149d4ad5959179df48f03204',
		secret: '424d5efbab804d3184f62a7ca7bcb4ff',
	});
    // Not sure how to get this to automatically search for the Sign and also the command in the 'query:' part. 
	music.search({type: 'track', query: songAndMovieName, limit: 1}, function(error, data){
		if (error) {
			console.log("Error");
		}	
        // Picking artist, song name, preview, and album from object that the api returns. 
		var songs = data.tracks.items;
		for (var i = 0; i < songs.length; i++) {
			console.log('artist(s): ' + songs[i].artists.map(getArtistsName));
			console.log('song name: ' + songs[i].name);
			console.log('preview song: ' + songs[i].preview_url);
			console.log('album: ' + songs[i].album.name);
		}	
	});
}
// Function for getting movies from OMDB
var findMovie = function() {
	var queryUrl = "http://www.omdbapi.com/?t=" + songAndMovieName + "&y=&plot=short&apikey=40e9cece";
	console.log(queryUrl);
	// Goes through object the API returns and grabs the info we want (no rotten tomatoes within object). 
	request(queryUrl, function(error, response, body){
		if (!error && response.statusCode === 200) {
			console.log("title: " + JSON.parse(body).Title);
			console.log("released: " + JSON.parse(body).Year);
			console.log("IMDB rating: " + JSON.parse(body).imdbRating);
			console.log("country " + JSON.parse(body).Country);
			console.log("language: " + JSON.parse(body).Language);
			console.log("plot summary: " + JSON.parse(body).Plot);
			console.log("cast: " + JSON.parse(body).Actors);
			
		}
	});
}
// fs stuff
var doWhatitSays = function() {
	fs.readFile('random.txt', 'utf8', function(error, data){
		if (error) {
			return console.log("Error")
		};
		var dataArr = data.split(",");
  		// Couldn't figure this out. Not super sure about what it does but it works.
		if (dataArr === 2) {
			pick(dataArr[0], dataArr[1]);
		} else if (dataArr === 1) {
			pick(dataArr[0]);
		}
	});
}
// code to acknowledge user commands 
if (command === "my-tweets") {
	getTweets();
}
else if (command === "spotify-this-song") {
	spotifyMeCapn();
} 
else if (command === "find-movie") {
	findMovie();
} 
else if (command === "do-what-it-says") {
	doWhatitSays();
}







