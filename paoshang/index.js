var path = require('path');
global.appDir = path.join(__dirname, '../')

const checks = require('../check/index')
const func = require('../index.js')
const allIcon = require('../base/map/allMapIcons')
const baseFun = require('../base/func.js')
const events = require('../base/events')
const robot = require('robotjs')
const getPixels = require('get-pixels')
const screenshot = require('screenshot-desktop')

const domt = require('./dosontArr')
global.icons = {}

let myfun = async function() {
  await events.sleep(2000)
  global.allIcons = await allIcon()
  console.log(allIcon.fcs)
  await events.moveStop()
  await baseFun.getWindow()
  let iconsm = await baseFun.getIconPx(allIcons.fcs)
  let mosPx = await baseFun.getMose()
  let shimenArr = ['toBP', 'ptrw']
  await events.doSomeThing(shimenArr, domt)
  await events.mouseMove([iconsm.jsons.fcsmMap.x, iconsm.jsons.fcsmMap.y])
  events.click()
  await events.moveStop()
  console.log('stop')
  events.click('right')
}
myfun()
