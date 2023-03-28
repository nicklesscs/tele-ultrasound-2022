const WebSocket = require('ws');
const ipc = require('node-ipc');

const ws = new WebSocket('ws://130.215.175.244:8080');

ws.on('open', function open() {
  console.log('connected to server');
});

ws.on('message', function incoming(message) {
  const data = JSON.parse(message);
  if (data.type === 'tf_polhemus') {
    console.log('Received tf_polhemus data:', data);
  }
});

ws.on('close', function close() {
  console.log('disconnected from server');
});

ipc.config.id = 'client';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.connectTo('server', function () {
  ipc.of.server.on('connect', function () {
    ipc.log('## connected to server ##'.rainbow, ipc.config.delay);
    ipc.of.server.emit('message', 'hello');
  });
  ipc.of.server.on('disconnect', function () {
    ipc.log('disconnected from server'.notice);
  });
});
