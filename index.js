let server = require('http').Server();
let io = require('socket.io')(server);
let redis = require("redis"),
    client = redis.createClient();

server.listen('3000', function () {
	console.log("Successfully connected on port 3000");
});

client.subscribe('test-channel')

client.on("message", function (channel, message) {
    message = JSON.parse(message);
    let sliced = message.event.split('\\');
    message.event = sliced[sliced.length - 1];
    console.log(message);
    io.emit(channel + ':' + message.event, message.data.user);
});