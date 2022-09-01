'use strict';
var ipc = require('node-ipc');

ipc.config.id = 'tendonControl';
ipc.config.retry = 1500;

ipc.serve(function () {
	ipc.server.on('motorConnect', function (data, socket) {
		this.socket = socket;
		ipc.server.emit(this.socket, 'handshake', 'handshake');
	});
	ipc.server.on('socket.disconnected', function (socket, destroyedSocketID) {
		ipc.log('client ' + destroyedSocketID + ' has disconnected!');
	});
});

ipc.server.start();
