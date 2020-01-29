const robot = require("robotjs")
//import robot from 'robotjs'
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')
var gm = require('gm');
var twoPI = Math.PI * 2.0;
robot.setMouseDelay(200);
robot.setKeyboardDelay(200)
const ioHook = require('iohook');
const net = require('net');
let robotkeys = {
  1: 'esc', 59: "f1", 60: "f2", 61: "f3", 62: "f4", 63: "f5", 64: "f6",
  16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't', 21: 'y', 22: 'u', 23: 'i',
  30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g', 35: 'h', 36: 'j', 37: 'k',
  44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b', 49: 'n', 50: 'm', 57: 'space',
}
const server = new net.createServer();
let clientName = 0
let clients = {}
server.on('connection', (client) => {
  client.name = ++clientName; // 给每一个client起个名
  clients[client.name] = client; // 将client保存在clients
  client.on('data', function (msg) { //接收client发来的信息
    let keystring = msg.toString()
    console.log(keystring)
    try {
      for (let i in clients) {
        clients[i].write(keystring)
      }

    } catch (e) {
      console.log('这个按键错误')
    }
  });
  client.on('error', function (e) { //监听客户端异常
    console.log('client error' + e);
    client.end();
  });
  client.on('close', function () {
    delete clients[client.name];
    console.log(`客户端${client.name}下线了`);
  });

});

const socket = new net.Socket();
const port = 8888;
const hostname = '192.168.1.6';
socket.setEncoding = 'UTF-8';
socket.connect(port, hostname, function () {
  socket.write('hello 大家好~~');
});
socket.on('data', function (msg) {
  console.log(msg.toString());
  let keystring = msg.toString().split(',')
  try {
    robot.keyToggle(robotkeys[keystring[0]], keystring[1] == 'keydown' ? 'down' : 'up')

  } catch (e) { }

});
socket.on('error', function (error) {
  console.log('error' + error);
});
socket.on('close', function () {
  console.log('服务器端下线了');
});
keyup = false;
ioHook.on('keydown', event => {
  if (keyup) return false
  keyup = true;
  socket.write(event.keycode.toString() + ',' + event.type);
})
ioHook.on('keyup', event => {
  if (!keyup) return false;
  keyup = false
  socket.write(event.keycode.toString() + ',' + event.type);
})
ioHook.start()
server.listen(8888)







