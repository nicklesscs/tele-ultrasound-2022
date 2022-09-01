let Motor = require("./motor");

let motor = new Motor("x", 17, 4, 2);

motor.setPosition(50);

setTimeout(() => {
	motor.setPosition(0);
}, 3000);

setTimeout(() => {
	motor.kill();
	process.exit(0);
}, 6000);
