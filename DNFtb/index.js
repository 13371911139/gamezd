const robot = require("robotjs")
//import robot from 'robotjs'
const getPixels = require("get-pixels")
const screenshot = require('screenshot-desktop')
var gm = require('gm');
var twoPI = Math.PI * 2.0;
robot.setMouseDelay(5);
robot.setKeyboardDelay(5)
const ioHook = require('iohook');


const net = require('net');
let robotkeys = {
  1: 'escape', 59: "f1", 60: "f2", 61: "f3", 62: "f4", 63: "f5", 64: "f6",
  16: 'q', 17: 'w', 18: 'e', 19: 'r', 20: 't', 21: 'y', 22: 'u', 23: 'i',
  30: 'a', 31: 's', 32: 'd', 33: 'f', 34: 'g', 35: 'h', 36: 'j', 37: 'k',
  44: 'z', 45: 'x', 46: 'c', 47: 'v', 48: 'b', 49: 'n', 50: 'm', 57: 'space',
  61000: 'up', 61003: 'left', 61008: 'down', 61005: 'right'
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
let keys
socket.on('data', function (msg) {
  if (process.env.NODE_Sn) {
    return false;
  }
  console.log(msg.toString() + ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
  let keystring = msg.toString().split(',')
  if (keys) {
    try {
      robot.keyToggle(keys, 'up')
    } catch (e) { }

  }
  try {

    robot.keyToggle(robotkeys[keystring[0]], keystring[1] == 'keydown' ? 'down' : 'up')
    keys = robotkeys[keystring[0]]
  } catch (e) { }

});
socket.on('error', function (error) {
  console.log('error' + error);
});
socket.on('close', function () {
  console.log('服务器端下线了');
});
keyup = false;

let = dosoting = r => {
  try {
    for (let i in clients) {

      clients[i].write(r)
    }
  } catch (e) {
    console.log('这个按键错误')
  }
}
ioHook.on('keydown', event => {
  if (keyup || !process.env.NODE_Sn) return false
  keyup = true;
  dosoting(event.keycode.toString() + ',' + event.type);
})
ioHook.on('keyup', event => {
  if (!keyup || !process.env.NODE_Sn) return false;
  keyup = false
  dosoting(event.keycode.toString() + ',' + event.type);
})
ioHook.start()
server.listen(8888)







