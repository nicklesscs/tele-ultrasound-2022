'use strict';
const Motor = require(__dirname + '/motor');

class MotorController {
	constructor() {
		this.motors = {};
		console.log('mocon set up');
	}

	addMotor(motorID, enablePin, directionPin, stepPin) {
		let motor = new Motor(motorID, enablePin, directionPin, stepPin);
		this.motors[motorID] = motor;
		return motor;
	}

	killAllMotors() {
		for (var motorID in this.motors) {
			this.motors[motorID].kill();
			console.log('killed ', motorID);
		}
	}
}

module.exports = MotorController;
