const robot = require('robotjs')
const baseFun = require('./func')
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
    sleep(100)
    robot.mouseToggle('down', type)
    sleep(300)
    robot.mouseToggle('up', type)
  },
  mouseMove: async where => {
    //return new Promise()
    let sd = 50
    let mose = await baseFun.getMose()
    let nowpy = robot.getMousePos()
    if (Math.abs(where[0] - mose[0]) < 5 && Math.abs(where[1] - mose[1]) < 5) {
      return false
    }
    console.log(where)
    let pyxc = (where[0] - nowpy.x) / sd
    let mosechax = (nowpy.x - mose[0]) / sd
    let pyyc = (where[1] - nowpy.y) / sd
    let mosechay = (nowpy.y - mose[1]) / sd
    console.log(mose, where, nowpy, mosechay, mosechax)
    if (!mose.length) {
      await sleep(100)
      events.mouseMove(where)
      return
    }
    for (let i = 0; i <= sd; i++) {
      robot.moveMouse(
        nowpy.x + pyxc * i + mosechax * i,
        nowpy.y + pyyc * i + mosechay * i
      )
    }
    return events.mouseMove(where)
  },
  moveStop: async () => {
    if (await baseFun.isStop()) {
      return true
    }
    await events.sleep(500)
    return events.moveStop()
  }
}
module.exports = events
