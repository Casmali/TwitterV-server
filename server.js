'use strict';

const Hapi = require('hapi');
const Twit = require('twit');

const T = new Twit({
	consumer_key: 'DiFBLMcG1itM2EAzMH0ujgNFy',
	consumer_secret: 'jaRm8Gu8H2vb2SwFIbyr9V4hhCk4a005lQ1XPL3NkmNC4IZXdU',
	access_token: '850731211961974788-dV3ug1kksSwiRRIszN65rOjW2TO4M4X',
	access_token_secret: '8ppxgzjjr5zLn2uydSd4xQlBbWJUoPVc5uw8kWZxCDiJw',
})

const server = new Hapi.Server();
server.connection({port: 4000, host: 'localhost', routes: { cors: true }});

server.route({
	method: 'GET',
	path: '/',
	handler: function(request, reply){
		reply('Hello, World!');
	}
})
 server.route({
 	method: 'GET',
 	path: '/{hashtag}',
 	handler: function(request, reply){
 		T.get('search/tweets', { q: `#${request.params.hashtag}`, count: 1000}, (err, data, response) => {
 			console.log(data);
 			reply(data);
 		})
 		
 	}
 });

server.start((err) => {
	if(err){
		throw err;
	}

	console.log(`Server running at: ${server.info.uri}`)
});