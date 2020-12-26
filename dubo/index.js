var path = require('path');
const robot = require('robotjs')
global.appDir = path.join(__dirname, '../')
const allIcon = require('./map')
const baseFun = require('../base/func.js')
global.events = require('../base/events')
global.icons = {}
let clientName = 0
let clients = {}
let shuguangguang = false
const net = require('net');
const server = new net.createServer();
server.on('connection', (client) => {
  client.name = ++clientName; // 给每一个client起个名
  clients[client.name] = client; // 将client保存在clients
  client.on('data', function (msg) { //接收client发来的信息
    let keystring = msg.toString()
    console.log(keystring)
    if (keystring == 'shuguangguang') {
      for (let i in clients) {
        clients[i].write('shuguangguang')
      }
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
const hostname = '192.168.116.129';
socket.setEncoding = 'UTF-8';
socket.connect(port, hostname, function () {
  socket.write('hello 大家好~~');
});
socket.on('data', function (msg) {
  if (process.env.NODE_Sn) {
    return false;
  }
  console.log(msg.toString() + ';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
  let keystring = msg.toString()
  if (keystring == 'shuguangguang') {
    shuguangguang = true
  }

});
socket.on('error', function (error) {
  console.log('error' + error);
});
socket.on('close', function () {
  console.log('服务器端下线了');
});
let myfun = async function () {
  await events.sleep(5000)

  global.allIcons = await allIcon()
  await baseFun.getWindow()

  let data = []
  let awaitgo = async () => {
    let ico = await baseFun.getIconPx(
      [allIcons.fcs.he,
      allIcons.fcs.shule,
      allIcons.fcs.next]
    )
    // console.log(data, ico.jsons)
    if (ico.jsons.next) {
      const syjl = []
      let j = 1
      for (let i = data[data.length - 1]; i; i = data[data.length - j]) {
        j++
        if (syjl.length <= 2 && i.sy != 'h') {
          syjl.push(i)
        }
      }
      let newData = {}
      let ishe = false
      if (data.length <= 0) {
        console.log('选闲', syjl)
        newData = { xy: 'h', tz: 'x', snum: 0, snum: 20 }
        data.push(newData)
        // 选择闲
      } else {
        if (ico.jsons.he) {
          // 选择续费
          console.log('和')
          ishe = true
          data[data.length - 1].sy = 'he'
          // data.push(syjl[0])
        }
        if (ico.jsons.shule) {
          // 配置上次结果
          console.log('输了')
          syjl[0].tz == 'x' ? syjl[0].sy = 'z' : syjl[0].sy = 'x'
          newData.snum = syjl[0].snum * 2
        }
        if (!ico.jsons.he && !ico.jsons.shule) {
          // 赢了  配置上局结果
          console.log('赢了')
          if (shuguangguang) {
            return false
          }
          syjl[0].sy = syjl[0].tz
          newData.snum = 20
        }
        // 开始新的一局
        console.log(syjl)
        if (syjl[1] && syjl[0].sy == syjl[1].sy) {
          newData.tz = syjl[0].sy
        } else {
          syjl[0].sy == 'x' ? newData.tz = 'z' : newData.tz = 'x'
        }
        if (ishe) {
          //syjl[0].sy = 'he'
          newData = syjl[0]
          ishe = false
        }

        data.push(newData)
      }
      if (newData.snum / 20 >= 32) {
        socket.write('shuguangguang')
        return
      }
      // 设置位置 点击次数
      if (newData.tz == 'x') {
        robot.moveMouse(292, 397)
        for (let i = 0; i < newData.snum / 20; i++) {
          await events.click()
        }
      } else if (data[data.length - 1].sy == 'he') {
        robot.moveMouse(1081, 652)
        await events.click()
      } else {
        robot.moveMouse(1003, 397)
        for (let i = 0; i < newData.snum / 20; i++) {
          await events.click()
        }
      }

    }
    await events.sleep(2000)
    return awaitgo()
  }
  awaitgo()
  // npm run db
}
myfun()
server.listen(8888)