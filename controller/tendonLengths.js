Math.radians = function (degrees) {
	return (degrees * Math.PI) / 180.0;
};

function rotX(v, theta) {
	theta = Math.radians(theta);
	let resultant = [0, 0, 0];
	resultant[0] = v[0];
	resultant[1] = v[1] * Math.cos(theta) - v[2] * Math.sin(theta);
	resultant[2] = v[1] * Math.sin(theta) + v[2] * Math.cos(theta);
	return resultant;
}

function rotY(v, theta) {
	theta = Math.radians(theta);
	let resultant = [0, 0, 0];
	resultant[0] = v[0] * Math.cos(theta) + v[2] * Math.sin(theta);
	resultant[1] = v[1];
	resultant[2] = -1 * v[0] * Math.sin(theta) + v[2] * Math.cos(theta);
	return resultant;
}

function getDistance(a, b) {
	return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2);
}

function getLegs(plate, anchor) {
	let l1 = getDistance(plate[0], anchor[0]);
	let l2 = getDistance(plate[1], anchor[1]);
	let l3 = getDistance(plate[2], anchor[2]);
	return [l1, l2, l3];
}

function rotate(p, x_theta, y_theta) {
	resultPlane = [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
	];
	for (i in [0, 1, 2]) {
		point = p[i];
		resultPlane[i] = rotY(rotX(point, x_theta), y_theta);
	}
	return resultPlane;
}

let anchorRadius = 90;
let planeRadius = 75;
let planeOffset = -52.76;
let sqrt3 = Math.sqrt(3);

let anchor = [
    [-anchorRadius, 0, 0],
    [anchorRadius/2, anchorRadius/2 * sqrt3, 0],
	[-anchorRadius/2, anchorRadius/2 * sqrt3, 0],
];

let plane = [
	[-planeRadius, 0, planeOffset],
	[planeRadius/2, planeRadius/2 * sqrt3, planeOffset],
	[-planeRadius/2, planeRadius/2 * sqrt3, planeOffset],
];

function getTendonLengths(theta_x, theta_y) {
	return getLegs(rotate(plane, theta_x, theta_y), anchor);
}

module.exports = getTendonLengths;