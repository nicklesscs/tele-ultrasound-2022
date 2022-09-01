'use strict';

class MotorDriver {
	constructor(enablePin, dirPin, stepPin) {
		let gpio = require('onoff').Gpio; //include onoff to interact with the GPIO
		this.enablePin = new gpio(enablePin, 'out');
		this.dirPin = new gpio(dirPin, 'out');
		this.stepPin = new gpio(stepPin, 'out');
		this.position = 0;
		this.goalPosition = 0;
		this.done = true;
		this.disableTimeout = null;
		this.enablePin.writeSync(1);

		console.log('Motor instantiated at (' + this.enablePin._gpio + ', ' + this.dirPin._gpio + ', ' + this.stepPin._gpio + ')');
		console.log("CREATING MOTOR");

	}

	tick() {
		this.enablePin.writeSync(0);
		clearTimeout(this.disableTimeout);
		this.done = false;
		//stop the motor loop if the motor is already in the goal position
		if (this.position == this.goalPosition) {
			this.done = true;
			clearTimeout(this.disableTimeout);
			this.disableTimeout = setTimeout(() => {
				this.enablePin.writeSync(1);
			}, 100);
			return;
		}

		if (this.goalPosition > this.position) {
			this.dirPin.writeSync(1);
			this.position++;
		} else {
			this.dirPin.writeSync(0);
			this.position--;
		}

		this.stepPin.writeSync(1);
		this.stepPin.writeSync(0);
		setTimeout(() => this.tick(), 2);

		// this.printVals();
	}

	setPosition(newGoal, delay = 0) {
		if (this.goalPosition > newGoal) delay = 50;
		setTimeout(() => {
			this.goalPosition = newGoal;
			if (this.done) this.tick();
		}, delay);
	}

	printVals() {
		let str = '';
		str += 'cur: ' + this.position + ', ';
		str += 'goal: ' + this.goalPosition;
		console.log(str);
	}

	deconstruct() {
		this.enablePin.writeSync(1);
		this.dirPin.writeSync(0);
		this.stepPin.writeSync(0);
		this.dirPin.unexport();
		this.stepPin.unexport();

		console.log('Motor disconnected from (' + this.enablePin._gpio + ', ' + this.dirPin._gpio + ', ' + this.stepPin._gpio + ')');
	}

	getInfo() {
		return 'Motor at (' + this.enablePin._gpio + ', ' + this.dirPin._gpio + ', ' + this.stepPin._gpio + ')';
	}
}

module.exports = MotorDriver;
