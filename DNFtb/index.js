const robot = require("robotjs")
//import robot from 'robotjs'
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')
const checks = require('../check/index')
var gm = require('gm');
var events = require("events");
let PS = require('../paoshang/index')
var twoPI = Math.PI * 2.0;
robot.setMouseDelay(200);
robot.setKeyboardDelay(200)
const ioHook = require('iohook');
ioHook.on('keydown', event => {
	console.log(event)
	if (event.ctrlKey) {
		
    }
})









