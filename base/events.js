const robot = require('robotjs')
const baseFun = require('./func')
const domt = require('../shimen/dosomeThing')
sleep = time => {
  return new Promise((r, j) => {
    setTimeout(t => {
      r()
    }, time)
  })
}
let events = {
  sleep: sleep,
  click: async (type = 'left') => {
    sleep(200)
    robot.mouseToggle('down', type)
    sleep(400)
    robot.mouseToggle('up', type)
  },
  mouseMove: async (where, ischeckmose) => {
    //return new Promise()
    let sd = 50

    let nowpy = robot.getMousePos()
    let mose = [nowpy.x, nowpy.y]
    mose = await baseFun.getMose()
    if (process.env.NODE_type == 'mh') {
      // mose = await baseFun.getMose()
    }
    if (!mose[0]) {
      robot.moveMouse(where[0], where[1])
      return events.mouseMove(where)
      robot.moveMouse(nowpy.x + 50, nowpy.y + 50)
      mose = await baseFun.getMose()
    }
    console.log('坐标差：x:' + (where[0] - mose[0]) + 'y:' + (where[1] - mose[1]))
    if (Math.abs(where[0] - mose[0]) < 5 &&
      Math.abs(where[1] - mose[1]) < 5) {
      return false
    }
    let pyxc = (where[0] - nowpy.x) / sd
    let mosechax = (nowpy.x - mose[0]) / sd
    let pyyc = (where[1] - nowpy.y) / sd
    let mosechay = (nowpy.y - mose[1]) / sd
    console.log(mose, where, nowpy, mosechay, mosechax)
    if (!mose.length) {
      await sleep(100)
      return events.mouseMove(where)
    }
    for (let i = 0; i <= sd; i++) {
      robot.moveMouse(
        nowpy.x + pyxc * i + mosechax * i,
        nowpy.y + pyyc * i + mosechay * i
      )
    }

    return ischeckmose != 'checkmose' && events.mouseMove(where)
  },
  keytap: async (key, key2) => {
    await events.sleep(200)
    if (typeof key == 'string' && !key2) {
      return robot.keyTap(key)
    }
    if (typeof key == 'object' && !key2) {
      for (let i = 0; i < key.length; i++) {
        let item = key[i]
        await events.sleep(50)
        robot.keyTap(item)
      }
    }
    if (key && key2) {
      return robot.keyTap(key, key2)
    }
  },
  keydbtap: async (key, time) => {
    robot.keyTap(key)
    await events.sleep(300)
    robot.keyToggle(key, 'down')
    return new Promise((r, j) => {
      setTimeout(n => {
        robot.keyToggle(key, 'up')
        r()
      })
    })
  },
  // 判断是否正在移动
  moveStop: async () => {
    if (await baseFun.isStop()) {
      return true
    }
    await events.sleep(500)
    return events.moveStop()
  },
  doSomeThing: async (arr, domt = domt, index = 0, dindex = 0) => {
    //校验要做什么
    //获取对应模板

    let data
    let iconsm
    try {
      data = domt[arr[index]][dindex]
    } catch (error) { }

    if (data) {
      if (data.beforeAwait) {
        await events.sleep(data.beforeAwait)
      }

      if (data.key) {
        await events.keytap(data.key)
      }
      data.mosebytab && await events.keytap('tab')
      if (data.check || data.checkt) {
        await events.sleep(500)
        console.log(data)
        console.log(allIcons.fcs[data.checkt])
        iconsm = await baseFun.getIconPx(allIcons.fcs[data.check || data.checkt], data.checkt)
        console.log(data.name)


        await events.mouseMove([
          iconsm.jsons[data.check].x +
          (data.checkmosec ? data.checkmosec[0] : 0),
          iconsm.jsons[data.check].y +
          (data.checkmosec ? data.checkmosec[1] : 0)
        ])

      }
      if (data.checkmose && data.check) {

        await events.mouseMove([
          iconsm.jsons[data.check].x + data.checkmose[0],
          iconsm.jsons[data.check].y + data.checkmose[1]
        ], 'checkmose')

      }
      if (data.mose) {
        await events.mouseMove(data.mose)
      }
      data.mosebytab && await events.keytap('tab')
      if (data.checkClick) {
        await events.click()
      }
      if (data.closeall) {
        await events.click('right')
      }
      if (data.stop) {

        await events.moveStop()
      }
    } else {
      return false
    }
    if (data.afterAwait) {
      await events.sleep(data.afterAwait)
    }
    dindex++
    if (!domt[arr[index]][dindex]) {
      index++
      dindex = 0
      if (!arr[index]) {
        return false
      }
    }
    await events.sleep(200)
    return events.doSomeThing(arr, domt, index, dindex)
  }
}
module.exports = events
