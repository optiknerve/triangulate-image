'use strict';

var Canvas = require('canvas-browserify');

module.exports = function (imageData) {
	// this is mainly required to run the browser tests.
	// phantomjs < v2 doesn't understand Uint8ClampedArray
	if (typeof Uint8ClampedArray === 'undefined') {
		// http://stackoverflow.com/a/11918126/229189
		var canvas = Canvas(imageData.width, imageData.height);
		var ctx = canvas.getContext('2d');
		ctx.putImageData(imageData, 0, 0);

		return ctx.getImageData(0, 0, imageData.width, imageData.height);
	} else {
		// http://stackoverflow.com/a/15238036/229189
		return {
			width: imageData.width,
			height: imageData.height,
			data: new Uint8ClampedArray(imageData.data)
		};
	}
};