const WebSocket = require('ws');
const ipc = require('node-ipc');

const ws = new WebSocket('ws://130.215.175.244:8080');

ws.on('open', function open() {
  console.log('Connected to server');
});

ws.on('message', function incoming(message) {
  try {
    const data = JSON.parse(message);
    if (data.type === 'tf_polhemus') {
      console.log('Received tf_polhemus data:', data);
    }
  } catch (error) {
    console.error(`Error parsing message: ${error}`);
  }
});

ws.on('close', function close() {
  console.log('Disconnected from server');
  setTimeout(() => {
    console.log('Reconnecting to server...');
    ws.connect();
  }, 2000);
});

ws.on('error', function error(error) {
  console.error(`WebSocket error: ${error}`);
});

ipc.config.id = 'client';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.connectTo('server', function () {
  ipc.of.server.on('connect', function () {
    ipc.log('## Connected to server ##'.rainbow, ipc.config.delay);
    ipc.of.server.emit('message', 'hello');
  });
  ipc.of.server.on('disconnect', function () {
    ipc.log('Disconnected from server'.notice);
  });
});
