const axios = require('axios');
const { PerformanceObserver, performance } = require('perf_hooks');

async function test() {
	var t0 = performance.now();

	await axios.post('http://localhost:8000', {
		directionPin: 17,
		stepPin: 4,
    });
    
	var t1 = performance.now();
	console.log('Call to doSomething took ' + (t1 - t0) + ' milliseconds.');
}

test();
