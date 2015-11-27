define(['twitterFetcher'], function (fetcher) {

	'use strict';

	var config = {
		"id": '483257072985726976',
		"domId": 'js-twitter-list',
		"showTime" : false,
		"maxTweets": 2,
		"enableLinks": true,
		"showRetweet" : false,
		"showInteraction" : false
	};

	fetcher.fetch(config);

});