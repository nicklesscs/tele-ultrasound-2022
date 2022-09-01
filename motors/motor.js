'use strict';
const axios = require('axios');
const { spawn } = require('child_process');
const RawIPC = require('node-ipc').IPC;
const EventEmitter = require('events');

class Motor {
	constructor(motorID, enablePin, directionPin, stepPin) {
		this.motorID = motorID;
		this.enablePin = enablePin;
		this.directionPin = directionPin;
		this.stepPin = stepPin;

		this.ready = false;
		this.readyEmitter = new EventEmitter();

		this.initServer();
		this.initDriver();
	}

	initServer() {
		this.ipc = new RawIPC();
		this.ipc.config.id = this.motorID;
		this.ipc.config.retry = 1500;
		this.ipc.config.silent = true;
		this.ipc.serve();
		this.ipc.server.on('handshake', (data, socket) => {
			this.ipc.server.emit(socket, 'init', {
				enablePin: this.enablePin,
				directionPin: this.directionPin,
				stepPin: this.stepPin,
			});
		});
		this.ipc.server.on('ready', (data, socket) => {
			this.socket = socket;
			this.readyEmitter.emit('ready');
			console.log(this.motorID + ' ready');
			this.ready = true;
		});
		this.ipc.server.on('socket.disconnected', (socket, destroyedSocketID) => {
			this.ipc.log(this.motorID + ' has disconnected!');
		});

		this.ipc.server.start();
	}

	initDriver() {
		this.driver = spawn('node', [__dirname + '/motorClient.js', this.motorID]);
		console.log('spawned');
		this.driver.stdout.on('data', (data) => {
			console.log(`${this.motorID} out: ${data}`);
		});
		this.driver.stderr.on('data', (data) => {
			console.log(`${this.motorID} error: ${data}`);
		});
		this.driver.on('close', (code) =>
			console.log(this.motorID + ' closed safely ' + code)
		);
	}

	async sendMessage(type, data) {
		await this.available();
		this.ipc.server.emit(this.socket, type, data);
	}

	async available() {
		if (!this.ready) {
			console.log(this.motorID + ' still instantiating');
			await new Promise((resolve) => this.readyEmitter.once('ready', resolve));
		}
	}

	async setPosition(newGoal, delay = 0) {
		this.sendMessage('setPosition', {
			setPoint: newGoal,
			delay: delay,
		});
	}

	kill() {
		this.driver.kill('SIGINT');
	}
}

module.exports = Motor;
