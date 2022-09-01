let Motor = require("./motor");

let motor = new Motor(17, 4);

motor.setPosition(50);

setTimeout(() => {
	motor.setPosition(0);
}, 3000);

setTimeout(() => {
	motor.deconstruct();
}, 6000);
